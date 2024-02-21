import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common'
import { generateUpdateToken } from 'src/common/generate-update-token'
import { plainToInstance } from 'class-transformer'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from 'src/types/user'
import { Order } from 'src/types/order'
import { CreateOrderDTO, OrderDTO, UpdateOrderDTO } from 'src/dtos/order.dto'
import { Product } from 'src/types/product'
import { OrderStatus } from 'src/enums/order.enum'
import { Option } from 'src/types/option'
import { cancelOrder, createOrder } from 'src/helpers/GHNApis'

export interface PaginatedOrder {
  data: OrderDTO[]
  page: number
  limit: number
  totalCount: number
  totalPage: number
}

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Option') private optionModel: Model<Option>,
  ) {}

  async create(createOrderDTO: CreateOrderDTO, userid: string): Promise<OrderDTO> {
    try {
      const user = await this.userModel.findOne({ _id: userid })
      if (!user) {
        throw new HttpException('Không tìm thấy người dùng !', HttpStatus.NOT_FOUND)
      }
      try {
        const order = new this.orderModel({
          ...createOrderDTO,
          user: user,
          products: createOrderDTO.products.map((item) => ({
            product: item.product,
            option: item.option,
            quantity: item.quantity,
          })),
          updated_token: generateUpdateToken(),
          created_by: user,
        })

        try {
          await order.save()
          for (const item of createOrderDTO.products) {
            const option = await this.optionModel.findOne({ _id: item.option })
            if (option) {
              await option.updateOne({ stock: option.stock - item.quantity })
            }
          }
        } catch (error) {
          throw new HttpException(error, HttpStatus.NOT_FOUND)
        }
        return plainToInstance(OrderDTO, order, {
          excludeExtraneousValues: true,
        })
      } catch (error) {
        throw new HttpException(error, HttpStatus.NOT_FOUND)
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err
      } else throw new HttpException('Lỗi mạng !', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(orderId: string, updateOrderDTO: UpdateOrderDTO, userid: string) {
    try {
      const user = await this.userModel.findOne({ _id: userid })
      const order = await this.orderModel
        .findOne({
          _id: orderId,
        })
        .populate('products.product')
        .populate('products.option')

      if (!user) {
        throw new HttpException('Không tìm thấy user', HttpStatus.NOT_FOUND)
      }

      if (!order) {
        throw new HttpException('Không tìm thấy đơn hàng', HttpStatus.NOT_FOUND)
      }

      if (order.updated_token !== updateOrderDTO.updated_token) {
        throw new HttpException('Đơn hàng đang được cập nhật bởi một ai đó', HttpStatus.CONFLICT)
      }

      if (order.status === OrderStatus.PENDING && updateOrderDTO.status === OrderStatus.BEING_PICKED_UP) {
        const listProducts = order.products.map((item: any) => {
          return { name: item.product.product_name, quantity: item.quantity, weight: 1000 }
        })
        const data = {
          to_name: order.customer_name,
          to_phone: order.phone_number,
          to_address: order.address,
          to_ward_code: order.ward,
          to_district_id: order.district,
          cod_amount: order.payment.amount,
          items: listProducts,
        }

        const responseData = await createOrder(data)
        await order.updateOne({ order_code_ship: responseData.data.order_code })
      }

      if(updateOrderDTO.status === OrderStatus.CANCELED) {
        for (const item of order.products) {
          const option = await this.optionModel.findOne({ _id: item.option.id })
          if (option) {
            await option.updateOne({ stock: option.stock + item.quantity })
          }
        }
      }

      if(updateOrderDTO.status === OrderStatus.IN_RATING) {
        for (const item of order.products) {
          const product = await this.productModel.findOne({ _id: item.product.id })
          if (product) {
            await product.updateOne({ order_number: product.order_number + item.quantity })
          }
        }
      }

      if (order.status === OrderStatus.BEING_PICKED_UP && updateOrderDTO.status === OrderStatus.CANCELED) {
        await cancelOrder(order.order_code_ship)
      }

      const updateOrdertData = {
        ...updateOrderDTO,
        updated_token: generateUpdateToken(),
        updated_by: user,
        updated_date: Date.now(),
      }

      const updateResult = await order.updateOne(updateOrdertData)

      if (updateResult.modifiedCount > 0) {
        return { message: 'Cập nhật thành công !' }
      } else {
        throw new HttpException('Cập nhật thất bại !', HttpStatus.NOT_IMPLEMENTED)
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err
      } else {
        throw new HttpException('Lỗi mạng !', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async getAll(page?: number, limit?: number): Promise<PaginatedOrder> {
    const orders = await this.orderModel
      .find()
      .populate('products.product')
      .populate('products.option')
      .populate('created_by')
      .populate('user')

    const totalCount = orders.length

    const totalPage = Math.ceil(totalCount / limit)

    return {
      data: plainToInstance(OrderDTO, orders, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }),
      page,
      limit,
      totalCount,
      totalPage,
    }
  }

  async getOrderByUser(page?: number, limit?: number, userid?: string, status?: string): Promise<PaginatedOrder> {
    const orders = await this.orderModel
      .find({
        user: userid,
        status: status === OrderStatus.IN_RATING ? { $in: [OrderStatus.IN_RATING, OrderStatus.COMPLETED] } : status,
      })
      .populate('products.product')
      .populate('products.option')
      .populate('created_by')
      .populate('user')

    const totalCount = orders.length

    const totalPage = Math.ceil(totalCount / limit)

    return {
      data: plainToInstance(OrderDTO, orders, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }),
      page,
      limit,
      totalCount,
      totalPage,
    }
  }
}

import React, { useState, useEffect } from "react";

import PageTitle from "app/components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
  Input,
} from "@roketid/windmill-react-ui";
import {
  SearchIcon,
  TickIcon,
  CancelIcon,
  TruckIcon,
  EyeIcon,
} from "icons";
import Layout from "app/containers/Layout";
import { toast } from "react-toastify";
import Loader from "app/components/Loader/Loader";
import { formatCurrency } from "utils/formatCurrency";
import { getOrders, updateOrders } from "pages/api/orderApis";

function Order() {
  const [listOrder, setListOrder] = useState<any[]>([]);
  // const [totalCount, setTotalCount] = useState<number>(0);
  // const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const responseResults = await getOrders();
      setListOrder(responseResults.data);
    } catch (error: any) {
      const messages = error.response.data.message;
      if (Array.isArray(messages)) {
        toast.error(messages.join("\n"));
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getBadgeType = (status: string) => {
    switch (status) {
      case "Chờ xác nhận":
        return "warning";
      case "Đang lấy hàng":
      case "Đang vận chuyển":
        return "primary";
      case "Chờ đánh giá":
        return "neutral";
      case "Hoàn thành":
        return "success";
      default:
        return "danger";
    }
  };

  const handleCancelOrder = async (updatedToken: string, orderid: string) => {
    const userConfirmed = window.confirm(
      "Bạn có chắc muốn hủy đơn hàng này không?"
    );
    if (userConfirmed) {
      try {
        setIsLoading(true);
        const data = {
          status: "Đã hủy",
          updated_token: updatedToken,
        };
        await updateOrders(data, orderid);
        toast.success("Đã hủy đơn hàng");
        loadData();
      } catch (error: any) {
        const messages = error.response.data.message;
        if (Array.isArray(messages)) {
          toast.error(messages.join("\n"));
        } else {
          toast.error(error.response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdateOrder = async (
    status: string,
    updatedToken: string,
    orderid: string
  ) => {
    try {
      setIsLoading(true);
      const data = {
        status: status,
        updated_token: updatedToken,
      };
      await updateOrders(data, orderid);
      if (status === "Đang lấy hàng") {
        toast.success("Đã xác nhận đơn hàng");
      } else {
        toast.success("Đã giao cho đơn vị vận chuyển");
      }
      loadData();
    } catch (error: any) {
      const messages = error.response.data.message;
      if (Array.isArray(messages)) {
        toast.error(messages.join("\n"));
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <PageTitle>Đơn hàng</PageTitle>
      <div className="flex justify-between mb-4">
        <div className="flex flex-1">
          <div className="relative w-full max-w-sm mr-2 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Tìm kiếm đơn hàng"
              aria-label="Search"
            />
          </div>
          <Button>Tìm kiếm</Button>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Hành động</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {listOrder.map((order, i) => (
                  <>
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Avatar
                            className="hidden mr-3 md:block"
                            src={
                              process.env.APP_API_URL +
                              order.created_by.user_image
                            }
                            alt="User image"
                          />
                          <div>
                            <p className="font-semibold">
                              {order.created_by.user_name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {order.created_by.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {formatCurrency(order.payment.amount)} VNĐ
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge type={getBadgeType(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {new Date(order.created_date).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="small" aria-label="View">
                            <EyeIcon className="w-5 h-5" aria-hidden="true" />
                          </Button>
                          {order.status === "Chờ xác nhận" ? (
                            <>
                              <Button
                                layout="link"
                                size="small"
                                aria-label="Confirm"
                                onClick={() => {
                                  handleUpdateOrder(
                                    "Đang lấy hàng",
                                    order.updated_token,
                                    order.id
                                  );
                                }}
                              >
                                <TickIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </Button>
                              <Button
                                layout="link"
                                size="small"
                                aria-label="Cancel"
                                onClick={() => {
                                  handleCancelOrder(
                                    order.updated_token,
                                    order.id
                                  );
                                }}
                              >
                                <CancelIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </Button>
                            </>
                          ) : (
                            <>
                              {order.status === "Đang lấy hàng" ? (
                                <>
                                  <Button
                                    layout="link"
                                    size="small"
                                    aria-label="Deliver"
                                    onClick={() => {
                                      handleUpdateOrder(
                                        "Đang vận chuyển",
                                        order.updated_token,
                                        order.id
                                      );
                                    }}
                                  >
                                    <TruckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </Button>
                                  <Button
                                    layout="link"
                                    size="small"
                                    aria-label="Cancel"
                                    onClick={() => {
                                      handleCancelOrder(
                                        order.updated_token,
                                        order.id
                                      );
                                    }}
                                  >
                                    <CancelIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </Button>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={2}
                resultsPerPage={2}
                onChange={() => {}}
                label="Order navigation"
              />
            </TableFooter>
          </TableContainer>
        </>
      )}
    </Layout>
  );
}

export default Order;

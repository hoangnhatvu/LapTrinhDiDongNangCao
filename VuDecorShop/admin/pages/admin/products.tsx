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
import { EditIcon, TrashIcon, SearchIcon, ForbiddenIcon } from "icons";
import Layout from "app/containers/Layout";
import { toast } from "react-toastify";
import Loader from "app/components/Loader/Loader";
import { getProducts } from "pages/api/productApis";
import { formatCurrency } from "utils/formatCurrency";
import AddProductModal from "app/components/Product/AddProductModal";

function Product() {
  const [listProduct, setListProduct] = useState<any[]>([]);
  // const [totalCount, setTotalCount] = useState<number>(0);
  // const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const loadData = async () => {
    try {
      setIsLoading(true);
      const responseResults = await getProducts();
      setListProduct(responseResults.data);
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

  return (
    <Layout>
      <PageTitle>Sản phẩm</PageTitle>
      <div className="flex justify-between mb-4">
        <div className="flex flex-1">
          <div className="relative w-full max-w-sm mr-2 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Tìm kiếm sản phẩm"
              aria-label="Search"
            />
          </div>
          <Button>Tìm kiếm</Button>
        </div>
        <Button onClick={openModal}>Thêm sản phẩm</Button>
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
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell>Giá tạm thời</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Hành động</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {listProduct.map((product, i) => (
                  <>
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Avatar
                            className="hidden mr-3 md:block"
                            src={
                              process.env.APP_API_URL + product.product_image
                            }
                            alt="Product image"
                          />
                          <div>
                            <p className="font-semibold">
                              {product.product_name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {product.category.category_name}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {formatCurrency(product.temp_price)} VNĐ
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge type={product.is_actived ? "success" : "danger"}>
                          {product.is_actived ? "Đang bán" : "Dừng bán"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {new Date(product.created_date).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="small" aria-label="Edit">
                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                          </Button>
                          <Button
                            layout="link"
                            size="small"
                            aria-label="Delete"
                          >
                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                          </Button>
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
                label="Product navigation"
              />
            </TableFooter>
          </TableContainer>
          <AddProductModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            loadDataProduct={loadData}
          />
        </>
      )}
    </Layout>
  );
}

export default Product;

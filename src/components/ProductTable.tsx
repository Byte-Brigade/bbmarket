import Products from "@/pages/products";
import { Checkbox, Table } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";

type ProductTableProps = {
  products?: {
    id: number;
    title: string;
    price: string;
    stock: number;
    brand: string;
  }[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell className="!p-4">
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell>Product name</Table.HeadCell>
        <Table.HeadCell>Product added</Table.HeadCell>
        <Table.HeadCell>Stock</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {products ? (
          products.map((product) => {
            return (
              <Table.Row
                key={product.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="!p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.brand} | {product.title}
                </Table.Cell>
                <Table.Cell>Today, 19:40</Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell>Rp. {product.price}K</Table.Cell>
                <Table.Cell>
                  <Link
                    href={`products/${product.id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })
        ) : (
          <Table.Row>
            <Table.Cell colSpan={6} className="text-center">
              Kosong!
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

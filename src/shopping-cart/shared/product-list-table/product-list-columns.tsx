"use client";

import { type ColumnDef } from "@tanstack/react-table";

import type { ShoppingCartItem } from "@/shopping-cart/interfaces";

export const productListColumns: ColumnDef<ShoppingCartItem>[] = [
  {
    accessorKey: "numOfItems",
    header: "Cant",
  },
  {
    accessorKey: "name",
    header: "Artículo",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Precio</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "promo",
    header: "Promoción",
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Subtotal</div>,
    cell: ({ row }) => {
      const subTotal = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(subTotal);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

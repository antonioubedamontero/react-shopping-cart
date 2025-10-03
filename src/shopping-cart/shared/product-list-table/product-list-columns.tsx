"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ShoppingCartItem } from "@/shopping-cart/interfaces";
import { useShoppingCartContext } from "@/shopping-cart/contexts/shopping-cart.context";
import { EditCartItem } from "../edit-cart-item";

export const useProductListColumns = (): ColumnDef<ShoppingCartItem>[] => {
  const { shoppingCartDispatch } = useShoppingCartContext();

  return [
    // Columns
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
    // Actions
    {
      id: "actions",
      cell: ({ row }) => {
        const cartItem = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  shoppingCartDispatch({
                    type: "remove_item_from_cart",
                    payload: {
                      id: cartItem.id,
                    },
                  })
                }
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

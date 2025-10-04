"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { IoMdAddCircleOutline } from "react-icons/io";

import { PROMOTIONAL_VALUES } from "../interfaces";

import { Separator } from "@/components/ui/separator";
import { useProductCartAddItem } from "./hooks";
import { useShoppingCartContext } from "../contexts/shopping-cart.context";

export const NewCartItem = () => {
  const { cartItemForm, addCartItemFormHandler, resetCartItemFormHandler } =
    useProductCartAddItem();
  const { shoppingCartDispatch } = useShoppingCartContext();

  return (
    <section>
      <h2 className="text-2xl">Nuevo artículo</h2>
      <Separator />

      <div className="my-5">
        <Form {...cartItemForm}>
          <form
            autoComplete="off"
            onSubmit={cartItemForm.handleSubmit(addCartItemFormHandler)}
            className="space-y-4"
          >
            <FormField
              control={cartItemForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input placeholder="product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4 md:flex-row md:items-baseline">
              <FormField
                control={cartItemForm.control}
                name="numOfItems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input placeholder="cantidad de producto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cartItemForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input placeholder="Precio unitario" {...field} />
                    </FormControl>
                    <FormDescription>
                      Precio unitario <strong>sin promoción</strong>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cartItemForm.control}
                name="promo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promoción</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Promoción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROMOTIONAL_VALUES.map((promotion) => (
                          <SelectItem key={promotion.id} value={promotion.id}>
                            {promotion.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                className="flex gap-2 bg-slate-400 hover:bg-slate-500"
                type="submit"
              >
                <IoMdAddCircleOutline />
                <span>Añadir</span>
              </Button>

              <Button
                className="flex gap-2 bg-green-400 hover:bg-green-300"
                type="button"
                onClick={() => resetCartItemFormHandler()}
              >
                <RxReset />
                <span>Limpiar</span>
              </Button>

              <Button
                className="flex gap-2 bg-red-400 hover:bg-red-300"
                type="button"
                onClick={() =>
                  shoppingCartDispatch({
                    type: "clear_cart",
                  })
                }
              >
                <FaRegTrashAlt />
                <span>Vaciar carrito</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

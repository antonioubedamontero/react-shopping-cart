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

import { PROMOTIONAL_VALUES } from "../interfaces";

import { Separator } from "@/components/ui/separator";
import { useProductCartAddEditItem } from "./hooks";

export const NewCartItem = () => {
  const { cartItemForm, addCartItemFormHandler, resetCartItemFormHandler } =
    useProductCartAddEditItem();

  return (
    <section>
      <h2 className="text-2xl">Nueva tarea</h2>
      <Separator />

      <div className="my-5">
        <Form {...cartItemForm}>
          <form
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
                      Precio unitario sin promoción
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
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

            <div className="flex gap-2">
              <Button className="bg-slate-400 hover:bg-slate-500" type="submit">
                Añadir producto
              </Button>

              <Button
                className="bg-red-400 hover:bg-slate-500"
                type="button"
                onClick={() => resetCartItemFormHandler()}
              >
                Limpiar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

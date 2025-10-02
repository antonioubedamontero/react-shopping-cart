"use client";

import { useForm } from "react-hook-form";

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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PROMOTIONAL_VALUES, type NewCartItemI } from "../interfaces";

import { useShoppingCartContext } from "../contexts/shopping-cart.context";
import { calSubTotal } from "../helpers";
import { Separator } from "@/components/ui/separator";

const NAME_MIN_LENGTH = 2;
const promotionValuesId = PROMOTIONAL_VALUES.map((promo) => promo.id);

const newCartItemFormSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, `Longitud mínima ${NAME_MIN_LENGTH} caracteres`),
  numOfItems: z.coerce
    .number("Debe ser un número")
    .min(1, "Debe ser mayor o igual a 1"),
  price: z.coerce.number("Debe ser un número").gt(0, "Debe ser mayor a cero"),
  promo: z.enum(promotionValuesId),
});

const FORM_INITIAL_VALUE: NewCartItemI = {
  name: "",
  numOfItems: 0,
  price: 0,
  promo: "none",
};

export const NewCartItem = () => {
  const { shoppingCartState, shoppingCartDispatch } = useShoppingCartContext();

  const newCartItemForm = useForm<z.infer<typeof newCartItemFormSchema>>({
    resolver: zodResolver(newCartItemFormSchema) as any,
    defaultValues: {
      ...FORM_INITIAL_VALUE,
    },
  });

  const newCartItemSubmitFormHandler = (
    item: z.infer<typeof newCartItemFormSchema>
  ) => {
    const newItem = {
      ...item,
      total: calSubTotal(item.numOfItems, item.price, item.promo),
    };

    shoppingCartDispatch({
      type: "add_item_to_cart",
      payload: {
        shoppingCartItem: newItem,
      },
    });
    newCartItemForm.reset({ ...FORM_INITIAL_VALUE });
  };

  return (
    <section>
      <h2 className="text-2xl">Nueva tarea</h2>
      <Separator />

      <div className="my-5">
        <Form {...newCartItemForm}>
          <form
            onSubmit={newCartItemForm.handleSubmit(
              newCartItemSubmitFormHandler
            )}
            className="space-y-4"
          >
            <FormField
              control={newCartItemForm.control}
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
                control={newCartItemForm.control}
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
                control={newCartItemForm.control}
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
                control={newCartItemForm.control}
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

            <Button className="bg-slate-400 hover:bg-slate-500" type="submit">
              Añadir producto
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

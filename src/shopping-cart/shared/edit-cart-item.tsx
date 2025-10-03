"use client";

import { useState, type FormEvent } from "react";

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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { PROMOTIONAL_VALUES } from "../interfaces";
import { useProductCartEditItem } from "./hooks";

interface Props {
  id: string;
}

export const EditCartItem = ({ id }: Props) => {
  const { cartItemForm, editCartItemFormHandler } = useProductCartEditItem(id);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" type="button">
            Editar
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar artículo</DialogTitle>
          </DialogHeader>

          <Form {...cartItemForm}>
            <form
              autoComplete="off"
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                editCartItemFormHandler(cartItemForm.getValues());
                setIsOpen(false);
              }}
            >
              <section className="flex flex-col gap-4">
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
              </section>

              <DialogFooter className="flex gap-4">
                <Button
                  className="bg-slate-400 hover:bg-slate-500"
                  type="submit"
                >
                  Guardar
                </Button>

                <Button
                  className="bg-red-400 hover:bg-red-300"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

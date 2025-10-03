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
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useEditModalContext } from "../contexts/edit-modal.context";

export const EditCartItem = () => {
  const { editModalContextData, setEditModalContextData } =
    useEditModalContext();

  if (!editModalContextData.id)
    throw new Error("Missing edit modal context data when editing cart item");

  const { cartItemForm } = useProductCartEditItem(editModalContextData.id);

  return (
    <section>
      <Dialog open={editModalContextData.isEditModalCartItemOpen}>
        <Form {...cartItemForm}>
          <form
            //onSubmit={cartItemForm.handleSubmit(editCartItemFormHandler)}
            onSubmit={console.log}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar artículo</DialogTitle>
              </DialogHeader>

              {/* TODO: Field id hidden */}

              <section>
                {/* TODO: Selected */}

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

                  /* TODO: total */
                />
              </section>

              <DialogFooter>
                <Button
                  className="bg-slate-400 hover:bg-slate-500"
                  type="submit"
                >
                  Guardar
                </Button>

                <DialogClose asChild>
                  <Button
                    className="bg-red-400 hover:bg-red-300"
                    type="button"
                    onClick={() =>
                      setEditModalContextData({
                        id: null,
                        isEditModalCartItemOpen: false,
                      })
                    }
                  >
                    Cancelar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </form>
        </Form>
      </Dialog>
    </section>
  );
};

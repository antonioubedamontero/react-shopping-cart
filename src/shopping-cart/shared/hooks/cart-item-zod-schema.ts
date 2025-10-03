import { z } from "zod";

import { PROMOTIONAL_VALUES } from "@/shopping-cart/interfaces";

const promotionValuesId = PROMOTIONAL_VALUES.map((promo) => promo.id);
const NAME_MIN_LENGTH = 2;

// Form schema validation
export const cartItemFormSchema = z.object({
  id: z.string("Debe ser una cadena de caracteres").optional(),
  selected: z.coerce.boolean("Deber ser un boleano").optional(),
  numOfItems: z.coerce
    .number("Debe ser un número")
    .min(1, "Debe ser mayor o igual a 1"),
  name: z
    .string()
    .min(NAME_MIN_LENGTH, `Longitud mínima ${NAME_MIN_LENGTH} caracteres`),
  price: z.coerce.number("Debe ser un número").gt(0, "Debe ser mayor a cero"),
  promo: z.enum(promotionValuesId),
  total: z.coerce.number("Debe ser un número").optional(),
});

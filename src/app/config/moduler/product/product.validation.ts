import { z } from 'zod';




const VariantScheme = z.object({
  type : z.string(),
  value: z.string(),
})

const inventoryValidation = z.object({
  quantity:z.number(),
  inStock:z.boolean()
});

export const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price:z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants : z.array(VariantScheme),
  inventory: inventoryValidation,
});

export default productValidationSchema;
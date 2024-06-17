import { z } from "zod";

export const orderValidation = z.object({
    email: z.string().email(),
    productId: z.string(),
    price : z.number(),
    quantity: z.number().positive({message:"Quantity should be positive"})
})
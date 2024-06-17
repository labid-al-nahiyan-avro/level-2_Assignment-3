import { Model, Schema, model } from "mongoose";
import { TOrder } from "./order.interface";
import { Product } from "../product/product.model";

const orderSchema = new Schema<TOrder>({
    email:{type:String},
    productId:{type:String},
    price: {type:Number},
    quantity:{type:Number}
})


orderSchema.pre('save',async function(next){

    const productId = this.productId
    const orderQuantity = this.quantity

    const product = await Product.findById(productId);

    let stockQuantity : number =  product?.inventory.quantity  as number
    

    if(stockQuantity < orderQuantity){

        next(new Error('Product is in shortage'));
    }
    else{
        stockQuantity-=orderQuantity;

        if(stockQuantity>0){
            await Product.updateOne({_id:productId},{ "inventory.quantity" : stockQuantity})
        }
        else{
            await Product.updateOne({_id:productId},{ "inventory.quantity" : stockQuantity, "inventory.inStock":false})
        }   
        

        next();
    }
})

export const Order = model<TOrder>("Order",orderSchema)

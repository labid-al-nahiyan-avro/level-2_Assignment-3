import { Model, Schema, model } from "mongoose";
import { TProduct as TProduct, Variant } from "./product.interface";


  const VariantScheme = new Schema<Variant>({
    type : {type:String},
    value: {type:String},
  })
  

const productSchema = new Schema<TProduct>({

    name: {type:String},
    description:  {type:String},
    price: {type:Number},
    category: {type:String},
    tags: [{type: String}],
    variants: [{type:VariantScheme}],
    inventory:{
      quantity:{type:Number},
      inStock:{type: Boolean},
    },

    
});

// studentSchema.methods.isUserExist = async (id:string)=>{
//   const isUserExist =  await Student.findOne({id})

//   return isUserExist;
// }


export const Product = model<TProduct>('Product', productSchema);


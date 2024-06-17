import { Schema, model, connect, Model } from "mongoose";

export type Variant = {
  type:string;
  value:string;
}

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: Array<string>;
  variants:Array<Variant>;
  inventory:{
    quantity:number;
    inStock:boolean;
  }
};

// export type StudentMethods = {
//   isUserExist: (id:string)=> Promise<TProduct | null>
// }

// export type StudentModel = Model<TProduct, {}, StudentMethods>
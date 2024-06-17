"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const VariantScheme = new mongoose_1.Schema({
    type: { type: String },
    value: { type: String },
});
const productSchema = new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    tags: [{ type: String }],
    variants: [{ type: VariantScheme }],
    inventory: {
        quantity: { type: Number },
        inStock: { type: Boolean },
    },
});
// studentSchema.methods.isUserExist = async (id:string)=>{
//   const isUserExist =  await Student.findOne({id})
//   return isUserExist;
// }
exports.Product = (0, mongoose_1.model)('Product', productSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
const orderSchema = new mongoose_1.Schema({
    email: { type: String },
    productId: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = this.productId;
        const orderQuantity = this.quantity;
        const product = yield product_model_1.Product.findById(productId);
        let stockQuantity = product === null || product === void 0 ? void 0 : product.inventory.quantity;
        if (stockQuantity < orderQuantity) {
            next(new Error('Product is in shortage'));
        }
        else {
            stockQuantity -= orderQuantity;
            if (stockQuantity > 0) {
                yield product_model_1.Product.updateOne({ _id: productId }, { "inventory.quantity": stockQuantity });
            }
            else {
                yield product_model_1.Product.updateOne({ _id: productId }, { "inventory.quantity": stockQuantity, "inventory.inStock": false });
            }
            next();
        }
    });
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);

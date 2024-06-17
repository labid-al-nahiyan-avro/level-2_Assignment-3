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
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const createProductDB = (student) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.create(student);
        return result;
    }
    catch (error) {
        throw new Error("Product create fail");
    }
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.find();
        return result;
    }
    catch (error) {
        throw new Error("Product fetch fail");
    }
});
const getProductBySearchTerm = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
                { tags: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        return result;
    }
    catch (error) {
        throw new Error("Product fetch by search term fail");
    }
});
const FindProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.findById({ _id: productId });
        return result;
    }
    catch (error) {
        throw new Error("Product find by id fail");
    }
});
const updateProductById = (productId, updatedInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.findOneAndUpdate({ _id: productId }, updatedInfo);
        return result;
    }
    catch (error) {
        throw new Error("Product update fail");
    }
});
const deleteProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.findByIdAndDelete({ _id: productId });
        return result;
    }
    catch (error) {
        throw new Error("Product delete fail");
    }
});
exports.ProductService = {
    createProductDB,
    FindProductById,
    getAllProductsFromDB,
    updateProductById,
    deleteProductById,
    getProductBySearchTerm
};

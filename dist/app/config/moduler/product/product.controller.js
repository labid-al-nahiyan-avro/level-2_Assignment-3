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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.body;
        //validation
        const data = product_validation_1.default.parse(product);
        // const studentModel = new Product(data)
        // if(await studentModel.isUserExist(data.id)){
        //     throw new Error("User already exists")
        // }
        const result = yield product_service_1.ProductService.createProductDB(data);
        console.log("result", result);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result ? result : "Undefined"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Message sent successfully",
            error
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.searchTerm; // api/products?searchTerm=iphone
    try {
        let result;
        if (searchTerm) {
            result = yield product_service_1.ProductService.getProductBySearchTerm(searchTerm);
            res.status(200).json({
                success: true,
                message: `Products matching search term ${searchTerm} fetched successfully!`,
                data: result ? result : "Undefined"
            });
        }
        else {
            result = yield product_service_1.ProductService.getAllProductsFromDB();
            res.status(200).json({
                success: true,
                message: "Product fetch successfully!",
                data: result ? result : "Undefined"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Message sent successfully",
            error
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        console.log(productId);
        const result = yield product_service_1.ProductService.FindProductById(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result ? result : "Undefined"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Message sent successfully",
            error
        });
    }
});
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const updatedInfo = req.body.product;
        console.log(productId);
        const result = yield product_service_1.ProductService.updateProductById(productId, updatedInfo);
        res.status(200).json({
            success: true,
            message: "Product update successfully!",
            data: result ? result : "Undefined"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Message sent successfully",
            error
        });
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const updatedInfo = req.body;
        console.log(productId);
        const result = yield product_service_1.ProductService.deleteProductById(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: result ? result : "Undefined"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Message sent successfully",
            error
        });
    }
});
exports.productController = {
    createProduct: createProduct,
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    updateProductById: updateProductById,
    deleteProductById: deleteProductById
};

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
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const createOrderDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.Order.create(order);
        return result;
    }
    catch (error) {
        throw new Error("Order create fail");
    }
});
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.Order.find();
        return result;
    }
    catch (error) {
        throw new Error("All Order get fail");
    }
});
const getOrderByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.Order.find({ email });
        return result;
    }
    catch (error) {
        throw new Error("Order get by email fail");
    }
});
exports.orderService = {
    createOrderDB,
    getAllOrder,
    getOrderByEmail
};

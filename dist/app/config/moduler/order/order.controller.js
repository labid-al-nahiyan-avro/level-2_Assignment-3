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
exports.orderController = void 0;
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body.order;
        const data = order_validation_1.orderValidation.parse(order);
        const result = yield order_service_1.orderService.createOrderDB(data);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result ? result : "undefined"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error || "Order create failed!",
            data: "undefined"
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (email) {
            const result = yield order_service_1.orderService.getOrderByEmail(email);
            res.status(200).json({
                success: true,
                message: "Order fetched successfully!",
                data: result ? result : "undefined"
            });
        }
        else {
            const result = yield order_service_1.orderService.getAllOrder();
            res.status(200).json({
                success: true,
                message: "Order fetched successfully!",
                data: result ? result : "undefined"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error || "Order fetch failed!",
            data: "undefined"
        });
    }
});
exports.orderController = {
    createOrder: createOrder,
    getAllOrder: getAllOrder
};

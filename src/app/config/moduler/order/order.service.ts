import { TOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrderDB = async(order:TOrder)=>{
    try {
        const result = await Order.create(order);
        return result;
    } catch (error) {
        throw new Error("Order create fail")
    }

}

const getAllOrder = async()=>{
    try {
        const result = await Order.find();
        return result;
    } catch (error) {
        throw new Error("All Order get fail")
    }
}

const getOrderByEmail = async(email:string)=>{
    try {
        const result = await Order.find({email});
        return result;
    } catch (error) {
        throw new Error("Order get by email fail")
    }
}

export const orderService = {
    createOrderDB,
    getAllOrder,
    getOrderByEmail
}
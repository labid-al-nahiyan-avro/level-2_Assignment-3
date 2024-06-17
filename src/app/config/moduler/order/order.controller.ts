import { Request, Response } from "express";
import { orderValidation } from "./order.validation";
import { orderService } from "./order.service";



const createOrder = async (req: Request, res: Response)=>{

    try {
        const order = req.body.order;
        const data = orderValidation.parse(order) 
        const result = await orderService.createOrderDB(data)

        res.status(200).json({
            success:true,
            message:"Order created successfully!",
            data: result?result:"undefined"
        })

    } catch (error:any) {
        console.log(error)
        res.status(500).json({
            success:false,
            message: error || "Order create failed!",
            data:"undefined"
        })
    }
}

const getAllOrder = async (req: Request, res: Response)=>{
    try {
        const email = req.query.email

        if(email){
            const result = await orderService.getOrderByEmail(email as string)

            res.status(200).json({
                success:true,
                message:"Order fetched successfully!",
                data: result?result:"undefined"
            })
        }
        else{
            const result = await orderService.getAllOrder()

            res.status(200).json({
                success:true,
                message:"Order fetched successfully!",
                data: result?result:"undefined"
            })
        }

    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error||"Order fetch failed!",
            data:"undefined"
        })
    }
}

export const orderController = {
    createOrder: createOrder,
    getAllOrder: getAllOrder
}
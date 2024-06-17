
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/config/moduler/product/product.route'
import { orderRoutes } from './app/config/moduler/order/order.route'

const app :Application = express()

//parser
app.use(express.json())
app.use(cors())


app.use("/api/products/",ProductRoutes)
app.use("/api/orders",orderRoutes)


app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"GET successfully!",
        
    })
})


export default app

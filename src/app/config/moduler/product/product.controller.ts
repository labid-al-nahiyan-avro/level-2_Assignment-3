import { Request, Response } from "express";
import { ProductService } from "./product.service";
import productValidationSchema from "./product.validation";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (req:Request, res: Response) =>{
    try {
        const {product } = req.body

        //validation
        const data :TProduct = productValidationSchema.parse(product)

        // const studentModel = new Product(data)
        // if(await studentModel.isUserExist(data.id)){
        //     throw new Error("User already exists")
        // }

        const result = await ProductService.createProductDB(data)
        console.log("result",result)

        res.status(200).json({
            success:true,
            message:"Product created successfully!",
            data:result?result:"Undefined"
        })

    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message||"Message sent successfully",
            error
        })
    }
}


const getAllProducts = async (req:Request, res: Response) =>{

    const searchTerm = req.query.searchTerm; // api/products?searchTerm=iphone

    try {

        let result:any

        if(searchTerm){
            result = await ProductService.getProductBySearchTerm(searchTerm as string)
            res.status(200).json({
                success:true,
                message:`Products matching search term ${searchTerm} fetched successfully!`,
                data:result?result:"Undefined"
            })
        }
        else{
            result = await ProductService.getAllProductsFromDB()
            res.status(200).json({
                success:true,
                message:"Product fetch successfully!",
                data:result?result:"Undefined"
            })
        }
        

    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message||"Message sent successfully",
            error
        })
    }
}

const getProductById = async (req:Request, res: Response) =>{

    try {
        const productId = req.params.productId 
        console.log(productId)

        const result = await ProductService.FindProductById(productId)
        res.status(200).json({
            success:true,
            message:"Product fetched successfully!",
            data:result?result:"Undefined"
        })
    } catch (error : any) {
        res.status(500).json({
            success:false,
            message:error.message||"Message sent successfully",
            error
        })
    }
    
}

const updateProductById = async (req:Request, res: Response) =>{

    try {
        const productId = req.params.productId 
        const updatedInfo = req.body.product
        console.log(productId)

        const result = await ProductService.updateProductById(productId , updatedInfo)
        res.status(200).json({
            success:true,
            message:"Product update successfully!",
            data:result?result:"Undefined"
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message||"Message sent successfully",
            error
        })
    }
}

const deleteProductById = async (req:Request, res: Response) =>{
    try {
        const productId = req.params.productId 
        const updatedInfo = req.body
        console.log(productId)

        const result = await ProductService.deleteProductById(productId)
        res.status(200).json({
            success:true,
            message:"Product deleted successfully!",
            data:result?result:"Undefined"
        })
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message||"Message sent successfully",
            error
        })
    }
}


export const productController = {
    createProduct: createProduct,
    getAllProducts : getAllProducts,
    getProductById : getProductById,
    updateProductById: updateProductById,
    deleteProductById: deleteProductById
}
import { TProduct } from "./product.interface";
import { Product } from "./product.model";


const createProductDB = async(student: TProduct)=>{


    try {
        const result =  await Product.create(student)

        return result;

    } catch (error) {
        throw new Error("Product create fail")
    }   
}
const getAllProductsFromDB = async()=>{
    try {
        const result = await Product.find()
        return result;
    } catch (error) {
        throw new Error("Product fetch fail")
    }
}


const getProductBySearchTerm = async(searchTerm:string)=>{
    try {
        const result = await Product.find({
                        $or: [
                            { name: { $regex: searchTerm, $options: 'i' } },
                            { description: { $regex: searchTerm, $options: 'i' } },
                            { category: { $regex: searchTerm, $options: 'i' } },
                            { tags: { $regex: searchTerm, $options: 'i' } }
                        ]
                    })
        return result
    } catch (error) {
        throw new Error("Product fetch by search term fail")
    }
}   

const FindProductById = async(productId: string)=>{
    try {
        const result = await Product.findById({_id:productId})
        return result;
    } catch (error) {
        throw new Error("Product find by id fail")
    }
}
const updateProductById = async(productId: string, updatedInfo:any)=>{

    try {
        const result = await Product.findOneAndUpdate({_id:productId}, updatedInfo)
        return result

    } catch (error) {
        throw new Error("Product update fail")
    }
}
const deleteProductById = async(productId:string)=>{
    try {
        
        const result  = await Product.findByIdAndDelete({_id:productId})  
        return result;
        
    } catch (error) {
        throw new Error("Product delete fail")
    }
}

export const ProductService = {
    createProductDB,
    FindProductById,
    getAllProductsFromDB,
    updateProductById,
    deleteProductById,
    getProductBySearchTerm
}
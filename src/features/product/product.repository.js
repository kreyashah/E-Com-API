import {ObjectId} from "mongodb";
import {applicationError} from "../../error-handler/applicationError.js";
import {getDB} from "../../config/mongodb.js";
import mongoose, { mongo } from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { CategorySchema } from "./category.schema.js";

const ProductModel = mongoose.model("products",productSchema);
const ReviewModel = mongoose.model("review",reviewSchema);
const CategoryModel = mongoose.model("categories",CategorySchema);

class ProductRepository{

    constructor()
    {
        this.collection="products";
    }

    async add(newProduct){
        try{
            // const db = getDB();
            // const collection = db.collection(this.collection);
            // await collection.insertOne(newProduct);
            //return newProduct;
            newProduct.categories=newProduct.category.split(",").map(e=>e.trim());
            const newProduct1 = new ProductModel(newProduct);
            console.log(newProduct1);
            const saveProduct=await newProduct1.save();
            console.log(saveProduct);
            await CategoryModel.updateMany({_id:{$in:newProduct1.categories}},
                {
                    $push:{products:new ObjectId(saveProduct._id)}
                })
            return saveProduct;

        }   
        catch(ex)
        {
            console.log(ex);
            throw new applicationError("Something went wrong");
        }
    }

    async getAll()
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products  = await collection.find().toArray();
            
            return products;
        }
        catch(ex)
        {
            throw new applicationError("Something went wrong");
        }
        
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const product  = await collection.findOne({_id:new ObjectId(id)});
            return product;
        }
        catch(ex)
        {
            throw new applicationError("Something went wrong");
        }
    }

    async filter(minPrice,categories){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price ={$gte:parseFloat(minPrice)}
            }
            categories=JSON.parse(categories.replace(/'/g,'"'));
            if(categories){
                filterExpression={$or:[{category:{$in:categories}},filterExpression]}
                // filterExpression.category =category
            }
            return collection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{$slice:1}}).toArray();
        }
        catch(ex)
        {
            throw new applicationError(ex);
        }
        
    }

//     async rate(userID,productId,rate)
//     {
//         try{
//             const db = getDB();
//             const collection = db.collection(this.collection);
//             const product = await collection.findOne({_id: new ObjectId( productId)});
//             console.log(product);
//             const userRating = product?.ratings?.find(r=>r.userID== userID);
//             console.log(userRating);
//             if(userRating){
//                 await collection.updateOne(
//                     {_id:new ObjectId(productId),"ratings.userID": new ObjectId(userID)
//                 },
//                 {
//                     $set:{
//                         "ratings.$.rate":rate
//                     }
//                 })
//             }
//             else{
//                 await collection.updateOne({
//                     _id:new ObjectId(productId)
//                 },{
//                     $push:{ratings:{userID: new ObjectId( userID),rate}}
//                 })
//             }
//         }
//         catch(ex)
//         {
//             throw new applicationError(ex);
//         }
//     }

// }

 async rate(userID,productId,rate)
    {
        try{
            const productToUpdate = await ProductModel.findById({_id:productId});
            if(!productToUpdate)
            {
                throw new Error("Product not found");
            }
            const userReview = await ReviewModel.findOne({product:new ObjectId(productId),user: new ObjectId(userID)});
            if(userReview){
                userReview.rating=rate;
                await userReview.save();
            }
            else{
                const userreview = new ReviewModel({product:new ObjectId(productId),user:new ObjectId(userID),rating:rate});
                userreview.save();
            }
        }
        catch(ex)
        {
            throw new applicationError(ex);
        }
    }

    async averageProductPricePerCategory()
    {
        try{
            const db=getDB();
           return await db.collection(this.collection).aggregate([
                {
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"}
                    }
                }
        ]).toArray();
        }
        catch(ex)
        {
            throw new applicationError(ex);
        }
    }

}

export default ProductRepository;
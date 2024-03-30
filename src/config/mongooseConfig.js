import mongoose from "mongoose";
import dotenv from "dotenv";
import { CategorySchema } from "../features/product/category.schema.js";

dotenv.config();

const url = process.env.DB_URL;

export const connectToMongoose=async ()=>{
    try{
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        await addCategory();
        console.log("MongoDB connected using mongoose");
        
    }
    catch(Ex)
    {
        console.log(Ex);
    }
}

async function addCategory(){
    const CategoryModel = mongoose.model("category",CategorySchema);
    const categories = await CategoryModel.find();
    if(!categories || categories.length==0){
        await CategoryModel.insertMany([{name:"Books"},{name:"Cloth"},{name:"Electronics"}]);
    }
}

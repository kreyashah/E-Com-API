import mongoose  from "mongoose";
import { likeSchema } from "./like.schema.js";
import {ObjectId} from "mongodb";

const likeModel = mongoose.model('Like',likeSchema);


export class LikeRepository{

    async likeProduct(userId,productId)
    {
        try{
            const newLike = new likeModel({
                user:new ObjectId(userId),
                likable:new ObjectId(productId),
                types:'products'
            })
            console.log(newLike);
            await newLike.save();
            return newLike;
        }
        catch(ex)
        {
            console.log(ex);
        }
    }

    async likeCategory(userId,categoryId)
    {

        try{
            const newLike = new likeModel({
                user:new ObjectId(userId),
                likable:new ObjectId(categoryId),
                types:'categories'
            })

            await newLike.save();
            return newLike;
        }
        catch(ex)
        {
            console.log(ex);
        }
    }

    async getLikes(type,id)
    {
        try{
            console.log(type+"  "+id);
            return await likeModel.find({likable:new ObjectId(id),types:type}).populate('user').populate({path:'likable',model:type});
        }
        catch(ex)
        {
            console.log(ex);
        }
    }

    
}
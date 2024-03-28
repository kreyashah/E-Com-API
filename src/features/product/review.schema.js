import mongoose from "mongoose";

export const reviewSchema = mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        res:"user"
    },
    rating:Number
})
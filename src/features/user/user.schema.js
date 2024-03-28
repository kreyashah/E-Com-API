import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    name:{type:String,
         maxLength:[25,"Name can't be greater than 25"]},
    email:{ type:String,unique:true,required:true,
        match:[/.+\@.+\../,"Not valid email"]
    },
    password:String,
    type:{type:String,enum:['Customer','Seller']}
});

import mongoose, { mongo } from "mongoose";

export const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    likable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'types'

    },
    types:{
        type:String,
        enum:['products','categories']
    }
}).pre('save',(next)=>{
    console.log("New like coming in");
    next();
}).post("save",(doc)=>{
    console.log("Like is saved");
    console.log(doc);
}).pre("find",(next)=>{
    console.log("retriving likes");
    next();
}).post("find",(doc)=>{
    console.log("find completed");
    console.log(doc);
})
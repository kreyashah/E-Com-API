import { getDB,getClient } from "../../config/mongodb.js";
import {ObjectId} from "mongodb";
import {applicationError} from "../../error-handler/applicationError.js";
import OrderModel from "../order/order.model.js";


export default class OrderRepository{
    constructor(){
        this.collection="orders";
    }

    async placeOrder(userId){
        const client = getClient();
       const session = client.startSession();
        try{
            const db = getDB();
            session.startTransaction()
           const items= await this.getTotalAmount(userId,session);
            const finalTotalAmount = items.reduce((acc, item)=>acc+item.totalAmount, 0)
            const newOrder = new OrderModel(new ObjectId(userId),finalTotalAmount,new Date());
            await db.collection(this.collection).insertOne(newOrder,{session});
            for(let item of items){
                await db.collection("products").updateOne(
                    {_id:item.productId},
                    {
                        $inc:{stock:-item.qty}
                    },{session}
                );

            }
           // throw new Error("something is wrong");
            db.collection("cartitem").deleteMany({
                userId:new ObjectId(userId)
            },{session});
            session.commitTransaction();
            session.endSession();
        }
        catch(ex)
        {
            await session.abortTransaction();
            session.endSession();
            throw new applicationError(ex);
        }
    }

    async getTotalAmount(userId,session){
        const db = getDB();
       const items=await db.collection("cartItem").aggregate([
        {
            $match:{userId:new ObjectId(userId)}
        },
       
        {
            $lookup:{
                from:"products",
                localField:"productId",
                foreignField:"_id",
                as:"productInfo"
            }
        },
        
        {
            $unwind:"$productInfo"
        },
        
        {
            $addFields:{
                "totalAmount":{
                    $multiply:["$productInfo.price","$qty"]
                }
            }
        }],{session}).toArray();
        return items;
        
    }
}
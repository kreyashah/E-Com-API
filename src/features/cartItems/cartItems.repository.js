import { ObjectId } from "mongodb";
import {getDB} from "../../config/mongodb.js";
import { applicationError } from "../../error-handler/applicationError.js";

export default class CartItemRepository{
    constructor()
    {
        this.collection="cartItem";
    }
    async add(cartItem)
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            cartItem._id = await this.getNextcounter(db);
            console.log(cartItem);
            cartItem.productId=new ObjectId(cartItem.productId);
            cartItem.userId=new ObjectId(cartItem.userId);
            const result = await collection.updateOne({
                productId:cartItem.productId,userId:cartItem.userId
            },{
                $setOnInsert:{_id:cartItem._id},
                $inc:{
                    qty:cartItem.qty
                }
            },{
                upsert:true
            });
            return result;
        }
        catch(ex)
        {
            throw new applicationError(ex);
        }
    }

    async get(userId)
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const cartItems = await collection.find({userId:new ObjectId(userId)}).toArray();
            return cartItems;
        }
        catch(ex)
        {
            throw new applicationError(ex);
        }
    }

    async delete(userId,cartItemId)
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({_id:new ObjectId(cartItemId),userId:new ObjectId(userId)});
            console.log(result);
            return result.deletedCount>0;

        }
        catch(ex)
        {
            throw new applicationError(ex);
        }
    }

    async getNextcounter(db){
       const counter =  await db.collection("counters").findOneAndUpdate(
            {_id:"cartItemId"},{
                $inc:{value:1}
            },
            {returnDocument:'after'}
            )
            return counter.value;
    }

}


import {MongoClient} from "mongodb";



let client;
export const connectToMongoDB =()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
        client=clientInstance;
        console.log("MongoDB is connected");
        createCounter(client.db());
        createIndezes(client.db());
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getDB=()=>{
    return client.db();
}

export const getClient=()=>{
    return client;
}

const createCounter=async(db)=>{
    const existingCounter = await db.collection("counters").findOne({_id:"cartItemId"});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:"cartItemId",value:0});
    }
}

const createIndezes=async(db)=>{
    try{
        await db.collection("products").createIndex({price:1});
        await db.collection("products").createIndex({name:1,category:-1});
        await db.collection("products").createIndex({desc:"text"});
    }
    catch(ex){
        console.log(ex);
    }
    
}


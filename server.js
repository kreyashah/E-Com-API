import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";


import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.route.js";
import cartItemRouter from "./src/features/cartItems/cartItems.routes.js";
import OrderRouter from "./src/features/order/order.route.js";
import LikeRouter from "./src/features/like/like.route.js";
import bodyParser from "body-parser";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import apiDocs from "./swagger.json" assert{type:"json"};
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import { applicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js"; 
import { connectToMongoose } from "./src/config/mongooseConfig.js";




const server = express();



var corsOption ={
    origin:"http://localhost:5500"
}

server.use(cors(corsOption));

server.use(bodyParser.json());

server.use(loggerMiddleware);

server.use("/api-docs",swagger.serve, swagger.setup(apiDocs));
server.use("/api/orders",jwtAuth,OrderRouter);
server.use("/api/likes",jwtAuth,LikeRouter);
server.use("/api/products",loggerMiddleware, jwtAuth, ProductRouter);
server.use("/api/users",loggerMiddleware,UserRouter);
server.use("/api/cartItem",loggerMiddleware,jwtAuth,cartItemRouter);

server.get("/",(req,res)=>{
    res.send("Welcome to E-commerce APIs")
});

server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof applicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send("Something went wrong. please try again later");
})

server.use((req,res)=>{
    res.status(404).send("API not found");
})

server.listen(3200,()=>{
    console.log("Running on 3200");
   // connectToMongoDB();
   connectToMongoose();
});



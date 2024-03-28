import Express   from "express";
import {LikeController} from "./like.controller.js";

const router = Express.Router();
const likeCotroller = new LikeController();

router.post("/",(req,res)=>{
    likeCotroller.likeItem(req,res);
});

router.get("/",(req,res)=>{
    likeCotroller.getLikes(req,res);
});




export default router;
import Express   from "express";
import CartItemsController from "./cartItems.controller.js";

const router = Express.Router();
const cartItemsController = new CartItemsController();

router.delete("/:id",(req,res)=>{
    cartItemsController.delete(req,res);
});
router.post("/",(req,res)=>{
    cartItemsController.add(req,res);
});
router.get("/",(req,res)=>{
    cartItemsController.get(req,res);
});



export default router;
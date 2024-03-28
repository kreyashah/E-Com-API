import OrderRepository from "./order.repository.js";

export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(req,res,next){
        try{
            const userId=req.userID;
            await this.orderRepository.placeOrder(userId);
            return res.status(200).send("Order placed");
        }
        catch(ex)
        {
            console.log(ex);
            return res.status(500).send("Something went wrong");
        }
    }
}
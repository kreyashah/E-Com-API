import CartItemModel  from "./cartItems.model.js";
import CartItemRepository from "./cartItems.repository.js";

export default class CartItemController{

    constructor()
    {
        this.cartItemRepository = new CartItemRepository();
    }

    async add(req,res){
        try{
            const {productId,qty}=req.body;
        const userID=req.userID;
        const cartItem = new CartItemModel(productId,userID,qty);
        const result = await this.cartItemRepository.add(cartItem);
        return res.status(201).send("Cart is updated");
        }
        catch(ex)
        {
            return res.status(500).send("Something went wrong");
        }

    }

    async get(req,res){
        try{
            const userId=req.userID;
            const items = await this.cartItemRepository.get(userId);
            return res.status(200).send(items);
        }
        catch(ex)
        {
            return res.status(500).send("Something went wrong");
        }
        
    }

    async delete(req,res)
    {
        try{
            const userID = req.userID;
            const cartItemId = req.params.id;
            console.log(cartItemId);
            const isDeleted =await this.cartItemRepository.delete(userID,cartItemId);
            if(!isDeleted)
            {
                return res.status(400).send("Item not found");
            }
            return res.status(200).send("Cat item is deleted");
        }
        catch(ex)
        {
            return res.status(500).send("Something went wrong");
        }
        
       
    }
}
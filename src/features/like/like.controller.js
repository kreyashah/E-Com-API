import {LikeRepository} from "./like.repository.js"

export class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async likeItem(req,res)
    {
        try{

            const {id,type} = req.body
            const userId=req.userID;
            console.log(id+"  "+type  );
            if(type!='products' && type!='categories'){
                return res.status(400).send("Invalid type");
            }
            if(type=='products')
            {
                console.log("Inside if");
                const product = await this.likeRepository.likeProduct(userId,id);
                return res.status(200).send(product);
            }
            else{
                const category = await this.likeRepository.likeCategory(userId,id);
                return res.status(200).send(category);
            }   
        }
        catch(ex)
        {
            return res.status(500).send("Something went wrong");
        }
    }

    async getLikes(req,res){
        try{
            const {id,type} = req.query;
            console.log(type+"  "+id);
            const likes = await this.likeRepository.getLikes(type,id);
            return res.status(200).send(likes);
        }   
        catch(Ex)
        {
            return res.status(500).send("Something went wrong");
        }
    }
}
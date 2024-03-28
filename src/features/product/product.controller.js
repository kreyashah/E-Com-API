import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{

    constructor()
    {
        this.productRepository = new ProductRepository();
    }
    
    async getAllProducts(req,res){
        try{
            const products= await this.productRepository.getAll();
            console.log(products);
            res.status(200).send(products);
        }
        catch(ex)
        {
            console.log(ex);
            return res.status(500).send(ex);
        }
       
    }

    async addProduct(req,res){
        try{
            const { name,price,categories,desc }=req.body;
            const newProduct = new ProductModel(    name,desc,
                parseFloat(price),
                null,
                categories,
                null
            );

            const createdRecord= await this.productRepository.add(newProduct);
        res.status(201).send(createdRecord);
            
        }
        catch(ex){
            console.log(ex);
            return res.status(500).send(ex);
        }
        
        
        
    }

    async rateProduct(req,res,next){
        try{
       
        const userId= req.userID;
        const productId=req.body.productId;
        const rate = req.body.rate;
        
           await this.productRepository.rate(userId,productId,rate);
        
        return res.status(200).send("Rating has been added");
        }
        catch(err){
            console.log("passing error to middleware");
            next(err);
        }
    }

   async getOneProduct(req,res){
        try{
            const id = req.params.id;
            const pro = await this.productRepository.get(id);
            if(!pro)
            {
                res.status(404).send("Product not found")
            }
            else{
                return res.status(200).send(pro)
            }
        }
        catch(ex)
        {
            console.log(ex);
            return res.status(500).send(ex);
        }
        
    }

    async filterProduct(req,res)
    {
        try{
            const minPrice = req.query.minPrice;
            
            const categories = req.query.categories;
            const result = await this.productRepository.filter(minPrice,categories);
            res.status(200).send(result);
        }
        catch(ex)
        {
            console.log(ex);
            return res.status(500).send(ex);
        }
       
    }

    async averagePrice(req,res,next)
    {
        try{
            const result=await this.productRepository.averageProductPricePerCategory();
            return res.status(200).send(result);
        }
        catch(ex)
        {
            console.log(ex);
            return res.status(500).send(ex);
        }
    }
}
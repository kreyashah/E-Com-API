import Express   from "express";
import ProductController from "./product.controller.js";
import {upload} from "../../middleware/fileupload.middleware.js";

const router = Express.Router();
const productcontroller = new ProductController();

router.get("/filter",(req,res)=>{
    productcontroller.filterProduct(req,res);
});
router.get("/",(req,res)=>{
    productcontroller.getAllProducts(req,res);
});
router.post("/",upload.single("imageUrl"), (req,res)=>{
    productcontroller.addProduct(req,res);
});
router.get("/averagePrice",(req,res,next)=>{
    productcontroller.averagePrice(req,res,next);
});
router.get("/:id",(req,res)=>{
    productcontroller.getOneProduct(req,res);
});
router.post("/rate",(req,res,next)=>{
    productcontroller.rateProduct(req,res,next);
});



export default router;
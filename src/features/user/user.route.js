import Express   from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const UserRouter = Express.Router();
const userController = new UserController();

UserRouter.post("/signup", (req,res)=>{
    userController.signUp(req,res);
});
UserRouter.post("/signin", (req,res)=>{
    userController.signIn(req,res);
});
UserRouter.post("/resetPassword",jwtAuth, (req,res)=>{
    userController.resetPassword(req,res);
});


export default UserRouter;
import { userModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import { applicationError } from "../../error-handler/applicationError.js";


export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req,res){
        try{
            const {name,email,password,type} = req.body;
            const hashPassword = await bcrypt.hash(password,12);
            const user = new userModel(name,email,hashPassword,type);
            const userr = await this.userRepository.SignUp(user);
            res.status(201).send(userr);    
        }
        catch(ex)
        {
            res.status(500).send(ex);
        }
        
        
    }

    async resetPassword(req,res){
        const {newPassword} = req.body;
        const hashPassword = await bcrypt.hash(newPassword,12);
        const userId = req.userID;
        const userID=req.userID;
        try{
            console.log(userId);
            await this.userRepository.resetPassword(userId,hashPassword);
            return res.status(200).send("Password reset");
        }
        catch(ex)
        {
            return res.status(500).send("Something went wrong");
        }

    }

    async signIn(req,res){
        try{
            const user = await this.userRepository.findByEmail(req.body.email);
            if(!user){
                return res.status(400).send("Invalid credentials");     
            }
            else{
                const result= await bcrypt.compare(req.body.password,user.password);
                console.log(user._id);
                if(result){
                    const token = jwt.sign({
                        userID:user._id,email:user.email
                    },process.env.JWT_SECRET,{ expiresIn:"1h"}
                    )
                    console.log(token);
                    return res.status(200).send(token);
                }
                else
                {
                    return res.status(400).send("Invalid credentials");     
                }
            }
        }
        catch(ex){
            console.log(ex);
            return res.status(500).send(ex);
        }
    }
}
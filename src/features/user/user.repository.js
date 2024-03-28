import mongoose from "mongoose";
import {userSchema} from "./user.schema.js"
import {applicationError} from "../../error-handler/applicationError.js";

const UserModel = mongoose.model('users',userSchema);

export default class UserRepository{
    async SignUp(user ){
        try{
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }
        catch(ex)
        {
            console.log(ex);
            throw new applicationError(ex); 
        }
    }

    async resetPassword(userId,hashpassword)
    {
        try{
            console.log(userId);
            let user = await UserModel.findById(userId);
            user.password=hashpassword;
            user.save();
        }
        catch(ex)
        {
            console.log(ex);
            throw new applicationError(ex); 
        }
    }

    async findByEmail(email){
        try{
           const user=await UserModel.findOne({email});
           return user;
        }
        catch(ex)
        {
            console.log(ex);
            throw new applicationError("Something went wrong",500);
        }
    }

    async signin(email,password)
    {
        try{
            const user = await UserModel.findOne({email,password});

        }
        catch(ex)
        {
            console.log(ex);
            throw new applicationError(ex);
        }


    }
}
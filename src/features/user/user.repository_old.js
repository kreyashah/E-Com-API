import { getDB } from "../../config/mongodb.js";
import { applicationError } from "../../error-handler/applicationError.js";

class UserRepository{

    constructor(){
        this.collection = "users";
    }

     async SignUp(newUser)
    {
        try{
            console.log(newUser);
            const db = getDB();
            const collection = db.collection(this.collection);
           await collection.insertOne(newUser);
        }
        catch(ex)
        {
            console.log(ex);
            throw new applicationError("Something went wrong",500);
        }
        
        return newUser
    }

    async findByEmail(email){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
           const user=await collection.findOne({email});
           return user;
        }
        catch(ex)
        {
            console.log(ex);
            throw new applicationError("Something went wrong",500);
        }
    }

    async SignIn(email,password)
    {
        try{
            const db = getDB();
            const collection = db.collection("users");
           const user=await collection.findOne({email,password});
           return user;
        }
        catch(ex)
        {
            console.log(ex);
            throw new applicationError("Something went wrong",500);
        }
        
    }
}

export default UserRepository;
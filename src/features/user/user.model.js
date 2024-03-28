import { getDB } from "../../config/mongodb.js";
import { applicationError } from "../../error-handler/applicationError.js";

export class userModel{
    constructor(name,email,password,type,id)
    {
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this._id=id;
    }

    

    static getAll()
    {
        return users;
    }

}

let users=[
    {
        id:1,
        name:"Seller user",
        email:"seller@ecom.com",
        password:"password1",
        type:"seller"
    },
    {
        id:2,
        name:"Customer user",
        email:"customer@ecom.com",
        password:"password1",
        type:"customer"
    }
]
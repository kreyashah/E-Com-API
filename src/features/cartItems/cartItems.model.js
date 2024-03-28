export default class CartItemModel{
    constructor(productId,userId,qty,id)
    {
        this.productId=productId;
        this.userId=userId;
        this.qty=qty;
        this._id=id;
    }


    static add(productId,userId,qty)
    {
        const cartItem=new CartItemModel(productId,userId,qty);
        cartItem.id=cartItems.length+1;
        cartItems.push(cartItem);
        return cartItem;
    }

    static get(userId)
    {
        return cartItems.filter(x=>x.userId==userId);
    }

    static delete(cartItemID,userID){
        const cartItem = cartItems.find(x=>x.id==cartItemID);
        if(!cartItem)
        {
            return "Item not found";
        }
        else
        {
            const index = cartItems.findIndex(x=>x.id==cartItemID &&  x.userId==userID);
            if(index==-1){
                return "Item not found";
            }
            else
            {
                cartItems.splice(index,1);
            }
        }
    }

}

var cartItems=[
    new CartItemModel(1,2,1,1),
    new CartItemModel(1,1,2,2)
];
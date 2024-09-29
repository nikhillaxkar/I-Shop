import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: [],
        total: 0
    },
    reducers: {
        addToCart: (currentState,{payload}) => {
            const foundItem=currentState.data.find(i=>i.pId == payload.pId);
            if(foundItem == undefined){
                currentState.data.push({pId: payload.pId,qty:1});
            }
            else{
                foundItem.qty++;
            }
            currentState.total +=payload.price;
            localStorage.setItem("cart",JSON.stringify(currentState));
        },
        changeQty:(currentState,{payload})=>{
            let foundIndex=null;
            const found=currentState.data.find(
                (item,index)=>{
                   if(item.pId == payload.pId){
                    foundIndex=index;
                    return true;
                   }else{
                    return false;
                   }
                }
            );
            if(found){
                if(payload.flag == 1){
                    found.qty++;
                    currentState.total +=payload.price;
                }
                else{
                    if(found.qty==1){
                        currentState.data.splice(foundIndex,1);

                    }else{
                        found.qty--;
                    }
                    currentState.total -=payload.price;
                }
            }
            localStorage.setItem("cart",JSON.stringify(currentState));

        },
        removeFromCart: (currentState) => {

          
        },
        emptyCart: (currentState) => {
            currentState.data=[];
            currentState.total=0;
            localStorage.removeItem("cart");
        },
        lsToCart: (currentState) => {
            const lsCart=localStorage.getItem("cart");
            if(lsCart != undefined){
                const {data,total}=JSON.parse(lsCart);
                currentState.data=data;
                currentState.total=total;
            }
        },
        dbToCart:(currentState,{payload})=>{
              currentState.total=payload.total;
              currentState.data=payload.userCart;
              localStorage.setItem("cart",JSON.stringify(currentState));

        },
       
    }
});

export const {dbToCart, addToCart, removeFromCart, emptyCart, lsToCart,changeQty } = cartSlice.actions;
export default cartSlice.reducer;

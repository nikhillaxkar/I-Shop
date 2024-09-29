import { createSlice } from "@reduxjs/toolkit";

const UserSlice=createSlice(
    {
        name: "user",
        initialState: {
          data:null
        },
        reducers:{
            login: (currentState,{payload})=>{
                currentState.data=payload.user;
                localStorage.setItem("user",JSON.stringify(payload.user));
            },
            logout:(currentState)=>{
             currentState.data=null;
             localStorage.removeItem("user");
            },
            lsToUser:(currentState)=>{
                const lsUser=localStorage.getItem("user");
                if(lsUser){
                    currentState.data=JSON.parse(lsUser);
                }
            }
        }
    }
)
export const {login,logout,lsToUser}=UserSlice.actions;
export default UserSlice.reducer;
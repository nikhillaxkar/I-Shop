import { createSlice } from "@reduxjs/toolkit";

const AdminSlice=createSlice(
    {
        name: "user",
        initialState: {
          data:null
        },
        reducers:{
            login: (currentState,{payload})=>{
                currentState.data=payload.admin;
                localStorage.setItem("admin",JSON.stringify(payload.user));
            },
            logout:(currentState)=>{
             currentState.data=null;
             localStorage.removeItem("admin");
            },
            lsToUser:(currentState)=>{
                const lsUser=localStorage.getItem("admin");
                if(lsUser){
                    currentState.data=JSON.parse(lsUser);
                }
            }
        }
    }
)
export const {login,logout,lsToUser}=AdminSlice.actions;
export default AdminSlice.reducer;
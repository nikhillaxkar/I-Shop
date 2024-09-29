const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
     {
        name:{
            type:String,
            maxLength: 50,
            require: true
        },
        email: {
            type: String,
            maxLength: 50,
            require:true,
            unique:true
        },
        password:{
            type:String,
           
            require:true
        },
        status:{
            type:Boolean,
            default:true
        }
     },
     {
        timestamps:true
     }
)
const User = mongoose.model("User", UserSchema);
module.exports = User;


const mongoose=require("mogoose");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    avatar:{
        type:String
    },
    date:{
        type:String,
        default:Data.now
    },
})

module.exports=User=mongoose.model("users",UserSchema);
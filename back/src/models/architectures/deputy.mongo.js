const mongoose=require('mongoose');

const deputySchema=new mongoose.Schema({
    _id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    createdDate:{
        type:Date,
        default:Date.now,
    }
})

const Deputies=mongoose.model('Deputy',deputySchema);

module.exports=Deputies;
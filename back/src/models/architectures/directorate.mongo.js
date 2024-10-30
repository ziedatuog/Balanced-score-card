const mongoose=require('mongoose');

const directorateSchema=new mongoose.Schema({
    _id:{
        type:String,
        required:true,
    },
    deputyId:{
        type:String,
        required:false,
    },
    name:{
        type:String,
        required:true,
    },
    createdData:{
        type:Date,
        default:Date.now,
    }
})

const Directorates=mongoose.model('Direcctorate',directorateSchema);
module.exports=Directorates;
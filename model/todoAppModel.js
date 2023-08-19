const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    userId:String,
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required:true
    }
    
});

const todoModel= mongoose.model('tasks',todoSchema);
module.exports=todoModel;
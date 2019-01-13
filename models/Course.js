const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new Schema({
    courseNameLoc:{
        type:String,
        required:true
    },
    courseNameEn:{
        type:String,
        required:true
    },
    coursePrice:{
        type:number,
        required:true,
    },
    courseCategory:{
        type:String,
        required:true
    }
    

})
module.exports = Course = mongoose.model('Course', courseSchema);
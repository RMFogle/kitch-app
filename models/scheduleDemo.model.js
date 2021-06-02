const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const scheduleDemoSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        minlength: 3 
    }, 
    phone: {
        type: String,  
        required: true,
    }, 
    email: {
        type: String, 
        required: true,
    },
    message: {
        type: String, 
        required: false,
    }, 
}, {
    timestamps: true, 
});

const ScheduleDemo = mongoose.model('ScheduleDemo', scheduleDemoSchema); 

module.exports = ScheduleDemo; 


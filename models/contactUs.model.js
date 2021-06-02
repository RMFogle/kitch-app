const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const contactUsSchema = new Schema({
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
    issue: {
        type: String, 
        required: false,
    }, 
}, {
    timestamps: true, 
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema); 

module.exports = ContactUs; 
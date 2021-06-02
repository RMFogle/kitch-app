const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const trashClientSchema = new Schema({
    clientname: {
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
    notes: {
        type: String, 
        required: false,
    }, 
}, {
    timestamps: true, 
});

const TrashClient = mongoose.model('TrashClient', trashClientSchema); 

module.exports = TrashClient; 
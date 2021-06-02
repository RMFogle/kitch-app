const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const supplySchema = new Schema({
    supplyitem: { type: String, required: true }, 
    vendor: { type: String, required: true }, 
    instock: { type: Number, required: true }, 
    need: { type: Number, required: true },
    topurchase: { type: Number, required: true }, 
    unitprice: { type: Number, required: true }, 
    totalcost: { type: Number, required: true }, 
}, {
    timestamps: true, 
}); 

const Supply = mongoose.model('Supply', supplySchema); 

module.exports = Supply; 



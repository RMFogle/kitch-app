const mongoose = require('mongoose')

const Schema = mongoose.Schema; 

const archiveInventorySchema = new Schema({
    fooditem: { type: String, required: true }, 
    category: { type: String, required: true }, 
    unitsize: { type: Number, required: true }, 
    instock: { type: Number, required: true }, 
    needed: { type: Number, required: true }, 
    topurchase: { type: Number, required: true }, 
    unitprice: { type: Number, required: true }, 
    totalcost: { type: Number, required: true},
    unittype: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true, 
}); 

const ArchiveInventory = mongoose.model('ArchiveInventory', archiveInventorySchema)

module.exports = ArchiveInventory; 
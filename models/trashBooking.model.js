const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const trashBookingSchema = new Schema({
    clientname: { type: String, required: true, },
    eventtype: { type: String, required: true, }, 
    location: { type: String, required: true, }, 
    date: { type: Date, required: true },
    starttime: { type: String, required: true, }, 
    endtime: { type: String, required: true, },
    guestcount: { type: Number, required: true, },
    meal: { type: String, required: true, }, 
    menu: { type: String, required: true, },
    costperguest: { type: Number, required: true, }, 
    totalcost: { type: Number, required: true, }
}, {
    timestamps: true, 
}); 

const TrashBooking = mongoose.model('TrashBooking', trashBookingSchema); 

module.exports = TrashBooking; 
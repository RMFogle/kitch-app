const router = require('express').Router(); 
let TrashBooking = require('../models/trashBooking.model'); 

router.route('/').get((req, res) => {
    TrashBooking.find()
    .then(trashBookings => res.json(trashBookings))
    .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/add').post((req, res) => {
    const clientname = req.body.clientname; 
    const eventtype = req.body.eventtype; 
    const location = req.body.location; 
    const date = Date.parse(req.body.date); 
    const starttime = req.body.starttime; 
    const endtime = req.body.endtime;
    const guestcount = req.body.guestcount; 
    const meal = req.body.meal; 
    const menu = req.body.menu; 
    const costperguest = req.body.costperguest; 
    const totalcost = req.body.totalcost; 

const newTrashBooking = new TrashBooking({
    clientname, 
    eventtype, 
    location, 
    date, 
    starttime, 
    endtime,
    guestcount, 
    meal, 
    menu, 
    costperguest, 
    totalcost, 
}); 

newTrashBooking.save()
.then(() => res.json('Trash Booking added!'))
.catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/:id').get((req, res) => {
    TrashBooking.findById(req.params.id)
        .then(trashBooking => res.json(trashBooking))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/:id').delete((req, res) => {
    TrashBooking.findByIdAndDelete(req.params.id)
        .then(() => res.json('Trash Booking deleted'))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/update/:id').post((req, res) => {
    TrashBooking.findById(req.params.id)
        .then(trashBooking => {
            trashBooking.clientname = req.body.clientname; 
            trashBooking.eventtype = req.body.eventtype; 
            trashBooking.location = req.body.location; 
            trashBooking.date = Date.parse(req.body.date); 
            trashBooking.starttime = req.body.starttime; 
            trashBooking.endtime = req.body.endtime;
            trashBooking.guestcount = req.body.guestcount; 
            trashBooking.meal = req.body.meal; 
            trashBooking.menu = req.body.menu; 
            trashBooking.costperguest = req.body.costperguest; 
            trashBooking.totalcost = req.body.totalcost; 

            trashBooking.save()
                .then(() => res.json('Trash Booking updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        }) 
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

module.exports = router; 
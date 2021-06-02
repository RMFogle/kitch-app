const router = require('express').Router(); 
let ArchiveBooking = require('../models/archiveBooking.model'); 

router.route('/').get((req, res) => {
    ArchiveBooking.find()
    .then(archiveBookings => res.json(archiveBookings))
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

    
const newArchiveBooking = new ArchiveBooking({
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

newArchiveBooking.save()
.then(() => res.json('Archive Booking added!'))
.catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/:id').get((req, res) => {
    ArchiveBooking.findById(req.params.id)
        .then(archiveBooking => res.json(archiveBooking))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/:id').delete((req, res) => {
    ArchiveBooking.findByIdAndDelete(req.params.id)
        .then(() => res.json('Archive Booking deleted'))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/update/:id').post((req, res) => {
    ArchiveBooking.findById(req.params.id)
        .then(archiveBooking => {
            archiveBooking.clientname = req.body.clientname; 
            archiveBooking.eventtype = req.body.eventtype; 
            archiveBooking.location = req.body.location; 
            archiveBooking.date = Date.parse(req.body.date);
            archiveBooking.starttime = req.body.starttime; 
            archiveBooking.endtime = req.body.endtime; 
            archiveBooking.guestcount = req.body.guestcount; 
            archiveBooking.meal = req.body.meal; 
            archiveBooking.menu = req.body.menu;
            archiveBooking.costperguest = req.body.costperguest; 
            archiveBooking.totalcost = req.body.totalcost; 


            archiveBooking.save()
                .then(() => res.json('Archive Booking updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        }) 
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

module.exports = router; 
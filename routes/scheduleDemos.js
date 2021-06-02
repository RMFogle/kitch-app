const router = require('express').Router(); 
let ScheduleDemo = require('../models/scheduleDemo.model'); 

router.route('/').get((req, res) => {
    ScheduleDemo.find()
        .then(scheduleDemos => res.json(scheduleDemos))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/add').post((req, res) => { 
    const name = req.body.name; 
    const phone = req.body.phone; 
    const email = req.body.email;
    const message = req.body.message; 
    
    const newScheduleDemo = new ScheduleDemo({
        name,
        phone,
        email,
        message
    }); 

    newScheduleDemo.save()
        .then(() => res.json('Scheduled Demo added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/:id').get((req, res) => {
    ScheduleDemo.findById(req.params.id) 
        .then(scheduleDemo => res.json(scheduleDemo))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/:id').delete((req, res) => {
    ScheduleDemo.findByIdAndDelete(req.params.id)
        .then(() => res.json('Scheduled Demo deleted!')) 
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/update/:id').post((req, res) => {
    ScheduleDemo.findById(req.params.id)
        .then(scheduleDemo => {
            scheduleDemo.name = req.body.name;
            scheduleDemo.phone = req.body.phone; 
            scheduleDemo.email = req.body.email;
            scheduleDemo.message = req.body.message; 

            scheduleDemo.save()
                .then(() => res.json('Scheduled Demo updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = router; 
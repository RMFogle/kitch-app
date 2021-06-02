const router = require('express').Router(); 
let ContactUs = require('../models/contactUs.model'); 

router.route('/').get((req, res) => {
    ContactUs.find()
        .then(contactUs => res.json(contactUs))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/add').post((req, res) => { 
    const name = req.body.name; 
    const phone = req.body.phone; 
    const email = req.body.email;
    const issue = req.body.issue; 
    
    const newContactUs = new ContactUs({
        name,
        phone,
        email,
        issue
    }); 

    newContactUs.save()
        .then(() => res.json('Contact Us added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/:id').get((req, res) => {
    ContactUs.findById(req.params.id) 
        .then(contactUs => res.json(contactUs))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/:id').delete((req, res) => {
    ContactUs.findByIdAndDelete(req.params.id)
        .then(() => res.json('Contact Us deleted!')) 
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/update/:id').post((req, res) => {
    ContactUs.findById(req.params.id)
        .then(contactUs => {
            contactUs.name = req.body.name;
            contactUs.phone = req.body.phone; 
            contactUs.email = req.body.email;
            contactUs.issue = req.body.issue; 

            contactUs.save()
                .then(() => res.json('Contact Us updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = router; 
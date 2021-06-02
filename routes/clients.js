const router = require('express').Router(); 
let Client = require('../models/client.model'); 

router.route('/').get((req, res) => {
    Client.find()
        .then(clients => res.json(clients))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/add').post((req, res) => { 
    const clientname = req.body.clientname; 
    const phone = req.body.phone; 
    const email = req.body.email;
    const notes = req.body.notes; 
    
    const newClient = new Client({
        clientname,
        phone,
        email,
        notes
    }); 

    newClient.save()
        .then(() => res.json('Client added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/:id').get((req, res) => {
    Client.findById(req.params.id) 
        .then(client => res.json(client))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/:id').delete((req, res) => {
    Client.findByIdAndDelete(req.params.id)
        .then(() => res.json('Client deleted!')) 
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/update/:id').post((req, res) => {
    Client.findById(req.params.id)
        .then(client => {
            client.clientname = req.body.clientname;
            client.phone = req.body.phone; 
            client.email = req.body.email;
            client.notes = req.body.notes; 

            client.save()
                .then(() => res.json('Client updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 
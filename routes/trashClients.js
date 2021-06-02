const router = require('express').Router(); 
let TrashClient = require('../models/trashClient.model'); 

router.route('/').get((req, res) => {
    TrashClient.find()
        .then(trashClients => res.json(trashClients))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/add').post((req, res) => {
    const clientname = req.body.clientname; 
    const phone = req.body.phone; 
    const email = req.body.email;
    const notes = req.body.notes; 
    
    const newTrashClient = new TrashClient({
        clientname,
        phone,
        email,
        notes
    }); 

    newTrashClient.save()
        .then(() => res.json('Trash Client added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/:id').get((req, res) => {
    TrashClient.findById(req.params.id) 
        .then(trashClient => res.json(trashClient))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/:id').delete((req, res) => {
    TrashClient.findByIdAndDelete(req.params.id)
        .then(() => res.json('Trash Client deleted!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/update/:id').post((req, res) => {
    TrashClient.findById(req.params.id)
        .then(trashClient => {
            trashClient.clientname = req.body.clientname;
            trashClient.phone = req.body.phone; 
            trashClient.email = req.body.email;
            trashClient.notes = req.body.notes; 

            trashClient.save()
                .then(() => res.json('Trash Client updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = router; 
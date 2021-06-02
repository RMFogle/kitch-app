const router = require('express').Router(); 
let ArchiveClient = require('../models/archiveClient.model')

router.route('/').get((req, res) => {
    ArchiveClient.find()
        .then(archiveClients => res.json(archiveClients))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/add').post((req, res) => {
    const clientname = req.body.clientname; 
    const phone = req.body.phone; 
    const email = req.body.email;
    const notes = req.body.notes; 
    
    const newArchiveClient = new ArchiveClient({
        clientname,
        phone,
        email,
        notes
    }); 

    newArchiveClient.save()
        .then(() => res.json('Archive Client added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/:id').get((req, res) => {
    ArchiveClient.findById(req.params.id) 
        .then(archiveClient => res.json(archiveClient))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/:id').delete((req, res) => {
    ArchiveClient.findByIdAndDelete(req.params.id)
        .then(() => res.json('Archive Client deleted!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

router.route('/update/:id').post((req, res) => {
    ArchiveClient.findById(req.params.id)
        .then(archiveClient => {
            archiveClient.clientname = req.body.clientname;
            archiveClient.phone = req.body.phone; 
            archiveClient.email = req.body.email;
            archiveClient.notes = req.body.notes; 

            archiveClient.save()
                .then(() => res.json('Archive Client updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = router; 
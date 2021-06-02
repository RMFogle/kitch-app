const router = require('express').Router(); 
let ArchiveInventory = require('../models/archiveInventory.model'); 

router.route('/').get((req, res) => {
    ArchiveInventory.find()
    .then(archiveInventorys => res.json(archiveInventorys))
    .catch(err => res.status(400).json('Error: ' + err)); 
}); 


    router.route('/add').post((req, res) => {
        const fooditem = req.body.fooditem; 
        const category = req.body.category; 
        const unitsize = Number(req.body.unitsize); 
        const instock = Number(req.body.instock); 
        const needed = Number(req.body.needed); 
        const topurchase = Number(req.body.topurchase); 
        const unitprice = Number(req.body.unitprice); 
        const totalcost = Number(req.body.totalcost);
        const unittype = req.body.unittype; 
        const date = Date.parse(req.body.date);

        const newArchiveInventory = new ArchiveInventory({
            fooditem, 
            category, 
            unitsize, 
            instock, 
            needed,
            topurchase,
            unitprice, 
            totalcost,
            unittype, 
            date,
        }); 

        newArchiveInventory.save()
        .then(() => res.json('Archive Inventory added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
    }); 

    router.route('/:id').get((req, res) => {
        ArchiveInventory.findById(req.params.id)
            .then(archiveInventory => res.json(archiveInventory))
            .catch(err => res.status(400).json('Error: ' + err)); 
    }); 

    router.route('/:id').delete((req, res) => {
        ArchiveInventory.findByIdAndDelete(req.params.id)
            .then(() => res.json('Archive Inventory deleted'))
            .catch(err => res.status(400).json('Error: ' + err)); 
    }); 

    router.route('/update/:id').post((req, res) => {
        ArchiveInventory.findById(req.params.id)
            .then(archiveInventory => {
                archiveInventory.fooditem = req.body.fooditem; 
                archiveInventory.category = req.body.category; 
                archiveInventory.unitsize = Number(req.body.unitsize); 
                archiveInventory.instock = Number(req.body.instock); 
                archiveInventory.needed = Number(req.body.needed); 
                archiveInventory.topurchase = Number(req.body.topurchase); 
                archiveInventory.unitprice = Number(req.body.unitprice); 
                archiveInventory.totalcost = Number(req.body.totalcost);
                archiveInventory.unittype = req.body.unittype;
                archiveInventory.date = Date.parse(req.body.date); 

                archiveInventory.save()
                    .then(() => res.json('Archive Inventory updated!'))
                    .catch(err => res.status(400).json('Error: ' + err)); 
            })
            .catch(err => res.status(400).json('Error: ' + err)); 
    }); 

    module.exports = router; 
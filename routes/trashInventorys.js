const router = require('express').Router(); 
let TrashInventory = require('../models/trashInventory.model'); 

router.route('/').get((req, res) => {
    TrashInventory.find()
    .then(trashInventorys => res.json(trashInventorys))
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

        const newTrashInventory = new TrashInventory({
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

        newTrashInventory.save()
        .then(() => res.json('Trash Inventory added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
    });

    router.route('/:id').get((req, res) => {
        TrashInventory.findById(req.params.id)
            .then(trashInventory => res.json(trashInventory))
            .catch(err => res.status(400).json('Error: ' + err)); 
    }); 

    router.route('/:id').delete((req, res) => {
        TrashInventory.findByIdAndDelete(req.params.id)
            .then(() => res.json('Trash Inventory deleted'))
            .catch(err => res.status(400).json('Error: ' + err));  
}); 

router.route('/update/:id').post((req, res) => {
    TrashInventory.findById(req.params.id)
        .then(trashInventory => {
            trashInventory.fooditem = req.body.fooditem; 
            trashInventory.category = req.body.category; 
            trashInventory.unitsize = Number(req.body.unitsize); 
            trashInventory.instock = Number(req.body.instock); 
            trashInventory.needed = Number(req.body.needed); 
            trashInventory.topurchase = Number(req.body.topurchase); 
            trashInventory.unitprice = Number(req.body.unitprice); 
            trashInventory.totalcost = Number(req.body.totalcost);
            trashInventory.unittype = req.body.unittype;
            trashInventory.date = Date.parse(req.body.date);

            trashInventory.save()
                .then(() => res.json('Trash Inventory updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

module.exports = router; 
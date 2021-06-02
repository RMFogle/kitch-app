const router = require('express').Router(); 
let Supply = require('../models/supply.model'); 

router.route('/').get((req, res) => {
    Supply.find()
    .then(supplys => res.json(supplys))
    .catch(err => res.status(400).json('Error: ' + err)); 
}); 


    router.route('/add').post((req, res) => {
        const supplyitem = req.body.supplyitem; 
        const vendor = req.body.vendor; 
        const instock = Number(req.body.instock); 
        const need = Number(req.body.need); 
        const topurchase = Number(req.body.topurchase); 
        const unitprice = Number(req.body.unitprice); 
        const totalcost = Number(req.body.totalcost); 

        const newSupply = new Supply({
            supplyitem,
            vendor,  
            instock, 
            need,
            topurchase,
            unitprice, 
            totalcost,  
    }); 

    newSupply.save()
    .then(() => res.json('Supply added!'))
    .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/:id').get((req, res) => {
    Supply.findById(req.params.id)
        .then(supply => res.json(supply))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/:id').delete((req, res) => {
    Supply.findByIdAndDelete(req.params.id)
        .then(() => res.json('Supply deleted'))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/update/:id').post((req, res) => {
    Supply.findById(req.params.id)
        .then(supply => {
            supply.supplyitem = req.body.supplyitem; 
            supply.vendor = req.body.vendor; 
            supply.instock = Number(req.body.instock); 
            supply.need = Number(req.body.need); 
            supply.topurchase = Number(req.body.topurchase); 
            supply.unitprice = Number(req.body.unitprice); 
            supply.totalcost = Number(req.body.totalcost); 

            supply.save()
                .then(() => res.json('Supply updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err)); 
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const Menu = require('../../models/Menu');
const Restaurant = require('../../models/Restaurant');

router.get('/', (req, res) => {
    Menu
        .find()
        .then(menu => {
            res.json(menu);
        })
        .catch(e => {
            res.json(e);
        })
})
router.post('/', (req, res) => {
    const newMenu = new Menu({
    });
    newMenu.save().then(menu => {
        res.json("menu created");
    });
    Restaurant.findByIdAndUpdate(
        req.body.restoId,
        {$push:{restaurantMenu:newMenu._id}},
        {new:true},
        function(err,resto){
            if(!err){
                res.send("update success:"+resto.restaurantMenu)
            }else{
                res.send(err)
            }
        }
    )
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/Restaurant');

router.get('/', (req, res) => {
    Restaurant
        .find()
        .then(restaurant => {
            res.json(restaurant);
        })
        .catch(e => {
            res.json(e);
        })
})
router.post('/', (req, res) => {
    const newRestaurant = new Restaurant({
        restaurantName: req.body.restaurantName,
        restaurantAddress: req.body.restaurantAddress,
        restaurantTelephone: req.body.restaurantTelephone
    });
    newRestaurant.save().then(restaurant => {
        res.json("Sign up successfully"+restaurant.restaurantName);
    });
});
module.exports = router;
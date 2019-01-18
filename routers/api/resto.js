const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/Restaurant');
const Menu = require('../../models/Menu');
const Course = require('../../models/Course');

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
router.get('/menu/:id', (req, res) => {
    let restaurantMenu = {
        // "restoName":"",
        // "courses":[],
    };
    Restaurant
        .findById(req.params.id)
        .then(restaurant => {
            restaurantMenu['restoName'] = restaurant.restaurantName;
            Menu
                .findById(restaurant.restaurantMenu)
                .then(menu => {
                    Course
                        .aggregate([
                            { $match: { '_id': { $in: menu.courses } } },
                            {
                                $group: {
                                    _id: "$courseCategory",
                                    courses: {
                                        $push: {
                                            "courseNameLoc": "$courseNameLoc",
                                            "courseNameEn": "$courseNameEn",
                                            "coursePrice": "$coursePrice",
                                            "image":"$image"
                                        }
                                    }
                                }
                            }
                        ])
                        .then(courses => {
                            restaurantMenu['menu'] = courses;
                            res.json(restaurantMenu)
                        })

                })
        })
})
router.post('/', (req, res) => {
    const newRestaurant = new Restaurant({
        restaurantName: req.body.restaurantName,
        restaurantAddress: req.body.restaurantAddress,
        restaurantTelephone: req.body.restaurantTelephone
    });
    newRestaurant.save().then(restaurant => {
        res.json("Sign up successfully" + restaurant.restaurantName);
    });
});
module.exports = router;
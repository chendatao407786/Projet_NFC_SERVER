const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');
const Menu = require('../../models/Menu');
router.get('/', (req, res) => {
    Course
        .find()
        .then(course => {
            res.json(course);
        })
        .catch(e => {
            res.json(e);
        })
})
router.post('/', (req, res) => {
    const newCourse = new Course({
        courseNameLoc: req.body.courseNameLoc,
        courseNameEn:req.body.courseNameEn,
        coursePrice:req.body.coursePrice,
        courseCategory: req.body.courseCategory,
        image:req.body.image
    });
    newCourse.save().then(course => {
        res.json("course created successfully");
    });
    Menu.findByIdAndUpdate(
        req.body.menuId,
        {$push:{courses: newCourse._id}},
        {new:true},
        function(err,menu){
            if(!err){
                res.send("update success:"+menu.courses)
            }else{
                res.send(err);
            }
        }
    )
});
module.exports = router;
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
        courseNameLoc: req.body.courseName,
        courseNameEn:req.body.courseNameEn,
        courseCategory: req.body.courseCategory
    });
    newCourse.save().then(() => {
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
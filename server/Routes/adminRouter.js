const { addEmployee } = require("../Controllers/Admin/employee")
const { protectionAdmin } = require('../Controllers/auth.js');
const { getAllCourse, getAllCourseParams, addCourse } = require("../Controllers/Admin/course.js")
const { Router } = require('express');

const router = Router()

router.post('/employee', protectionAdmin, addEmployee)

router.get("/getCourse", protectionAdmin, getAllCourse)

router.get("/getCourseSearch", protectionAdmin, getAllCourseParams)

router.post("/addCourse", protectionAdmin, addCourse)

module.exports = router;
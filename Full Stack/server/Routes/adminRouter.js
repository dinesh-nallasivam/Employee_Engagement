const { addEmployee } = require("../Controllers/Admin/employee")
const { protectionAdmin } = require('../Controllers/Auth/auth.js');
const { getAllCourse, getAllCourseParams, addCourse } = require("../Controllers/Admin/course.js")
const  { statusCount, monthReport, topEmployee, avgMetrics } = require('../Controllers/Admin/courseDashboard.js')
const { Router } = require('express');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads/');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Customize the filename
    }
});


const upload = multer({ storage: storage });

router.post('/employee', protectionAdmin, upload.single('image'), addEmployee)

router.get("/getCourse", protectionAdmin, getAllCourse)

router.get("/getCourseSearch", protectionAdmin, getAllCourseParams)

router.post("/addCourse", protectionAdmin, upload.single('image'), addCourse)

router.get('/statusCount', protectionAdmin, statusCount)

router.get('/monthReport', protectionAdmin, monthReport)

router.get("/topEmployee", protectionAdmin, topEmployee)

router.get('/avgMetrics', protectionAdmin, avgMetrics)

module.exports = router;
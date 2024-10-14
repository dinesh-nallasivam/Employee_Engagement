const { protectionUser } = require('../Controllers/Auth/auth.js');
const { Router } = require('express');
const { getChapterAndQuiz, updateCourseProgress, quizResult,  updateTimeSpent } = require('../Controllers/User/chapterAndQuiz.js')
const { getDashBoard, completedCourse, onProgressCourse } = require('../Controllers/User/dashBoard.js')
const { 
        getAllCourse, 
        getAllCourseParams, 
        getSelected, 
        createCourseProgress,
        addFeedback 
    } = require("../Controllers/User/course.js")


const router = Router()

router.get("/getCourse", protectionUser, getAllCourse)

router.get("/getCourseSearch", protectionUser, getAllCourseParams)

router.get('/getSelectedCourse', protectionUser, getSelected)

router.get('/enrolled', protectionUser, createCourseProgress)

router.post('/courseFeedback', protectionUser, addFeedback)

router.get('/getChapter', protectionUser, getChapterAndQuiz)

router.get('/chapterUpdate', protectionUser, updateCourseProgress)

router.post('/quiz', protectionUser, quizResult)

router.get('/dashboard', protectionUser, getDashBoard)

router.get('/onProgressCourse', protectionUser, onProgressCourse)

router.post('/updateTimeSpent', protectionUser, updateTimeSpent)

module.exports = router;
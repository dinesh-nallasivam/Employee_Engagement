
const prisma = require("../../index")

const getChapterAndQuiz = async(req,res)=>{
    
    const { courseId } = req.query
    
    try{
        const courseProgress = await prisma.courseProgress.findFirst({
            where: {
                employeeId: Number(req.employeeId),
                courseId: Number(courseId),
            }
        })

        const result = await prisma.chapter.findMany({
            where: {
                courseId: Number(courseId),
            },
            include: {
                quizzes: {
                    include: {
                        questions:{
                            include:{
                                options:true
                            }
                        },
                        quizResults: {
                            where: {
                                employeeId: Number(req.employeeId),
                            },
                        },
                    },
                },
            },
        })
    
        const list = []

        result.forEach((element,index) => {
            const isComplete = ((index+1)<=courseProgress.completedChapters)
            list.push({
                type:"chapter",
                isComplete,
                id:element.id,
                title:element.title,
                content:element.content,
                courseId:element.courseId,
                totalTimeComplete:element.totalTimeComplete
            })

            if (element.quizzes.length > 0) {
                element.quizzes.forEach((quiz) => {
                    const quizCompleted = (quiz.quizResults.length > 0)

                    list.push({
                        type: "quiz",
                        isComplete: quizCompleted,
                        id: quiz.id,
                        title: quiz.title,
                        totalMarks: quiz.totalMarks,
                        courseId: element.courseId,
                        chapterId: element.id,
                        questions:quiz.questions
                    })
                })
            }

        })

        return res.status(200).json({message: "Successful Retrived",data:list})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const checkAndUpdateProgress = async (employeeId, courseId) => {
    try {
        const course = await prisma.course.findFirst({
            where: { id: courseId },
            select: {
                totalChapter: true,
                totalQuiz: true,
            },
        })

        const progress = await prisma.courseProgress.findFirst({
            where: {
                employeeId,
                courseId
            },
        })

        const completedChapters = progress.completedChapters

        const completedQuizzes = await prisma.quizResult.count({
            where: {
                employeeId: employeeId,
                quiz: {
                    chapter: {
                        courseId: courseId,
                    }
                }
            }
        })

        const totalItems = course.totalChapter + course.totalQuiz
        const totalCompletedItems = completedChapters + completedQuizzes

        const newProgress = (totalCompletedItems / totalItems) * 100

        const up = {
            progress: newProgress,
            updatedAt: new Date(),
        }
        if(newProgress == 100){
            up.status = 'Completed'
        }

        if (progress.progress !== newProgress) {
            await prisma.courseProgress.updateMany({
                where: {
                     employeeId,
                    courseId,
                },
                data: {...up}
            })
        }

        return
    } catch (error) {
        console.error('Error updating progress:', error.message)
        throw new Error('Failed to update progress')
    }
}
 
const updateCourseProgress = async (req,res) => {
    try{
        const { courseId } =req.query
        const employeeId = req.employeeId
        const progress = await prisma.courseProgress.findFirst({
            where: {
                employeeId: Number(employeeId),
                courseId: Number(courseId)
            },
        })
        
        const newCompletedCount = progress.completedChapters + 1
        
        await prisma.courseProgress.updateMany({
            where: {
                employeeId: Number(employeeId), 
                courseId: Number(courseId)
            },
            data: {
                completedChapters: newCompletedCount
            }
        })

        await checkAndUpdateProgress(Number(employeeId), Number(courseId))

        return res.status(200).json({message: "Successful Updated"})

    }catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const quizResult = async(req,res)=>{
    try{

        const {data} = req.body
        const quiz = await prisma.quiz.findUnique({
            where: { id: Number(data.id) },
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });
        
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        let score = 0;
        
        
        data.questions.forEach((ques)=>{
            if(ques.options[Number(ques.answerChoosed)].isCorrect){
                score+=1
            }
        })

        await prisma.quizResult.create({
            data: {
                employeeId: Number(req.employeeId),
                quizId: Number(data.id),
                score: score,
                completedAt: new Date(),
            },
        })

        await checkAndUpdateProgress(Number(req.employeeId), Number(data.courseId))

        return res.status(201).json({message: "Successful Submitted"})

    }catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateTimeSpent = async (req, res) => {
    const {  courseId, timeSpent } = req.body;
   
    try {
        const progress = await prisma.courseProgress.findFirst({
            where: {
                    employeeId:req.employeeId,
                    courseId
            }
        });

        if (progress) {
            const updatedProgress = await prisma.courseProgress.update({
                where: {
                    id: progress.id,
                },
                data: {
                    timeSpent: progress.timeSpent + timeSpent,
                },
            });
            return res.json({ success: true, data: updatedProgress });
        }

        return res.status(404).json({ success: false, message: "Progress not found" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { getChapterAndQuiz, updateCourseProgress, quizResult, updateTimeSpent }
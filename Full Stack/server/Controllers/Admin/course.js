const prisma = require("../../index")

const getAllCourse = async (_,res)=>{

    try{
        const result = await prisma.course.findMany({
            select:{
                id:true,
                title:true,
                description:true,
                totalTimeComplete:true,
                totalQuiz:true,
                totalChapter:true,
                image:true
            }
        })
        return res.status(200).json({message: "Successful Retrived",data:result})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getAllCourseParams = async (req,res)=>{

    const { word } = req.query
    
    try{
        const result = await prisma.course.findMany({
            where:{
                title:{
                    contains:word
                }
            },
            select:{
                id:true,
                title:true,
                description:true,
                totalTimeComplete:true,
                totalQuiz:true,
                totalChapter:true,
                image:true
            }
        })
        
        return res.status(200).json({message: "Successful Retrived",data:result})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const addCourse = async(req,res)=>{
    try{
      
        let { courseName, description, chapters, feedbackQuestion } = req.body
        
        if(!courseName || !description || chapters.length==0 || feedbackQuestion.length==0){
            return res.status(404).json({message:"Please provide all neccessary details"})
        }
        
        chapters = JSON.parse(chapters)
        feedbackQuestion = JSON.parse(feedbackQuestion)

        const quizCount = chapters.reduce((count, currentChapter) => {
            return currentChapter.quiz.length !== 0 ? count + 1 : count
        }, 0)

         
        const image = req.file;

        if (!image) {
            return res.status(400).json({ message: 'No image uploaded' });
        }


        const course = await prisma.course.create({
            data:{
                title:courseName,
                description:description,
                totalTimeComplete:'1hr',
                totalChapter:chapters.length,
                totalQuiz:quizCount,
                image: `/uploads/${image.filename}` 
            }
        })

        chapters.map(async (chapter) => {
            const createdChapter = await prisma.chapter.create({
                data: {
                    title: chapter.chapterName,
                    content: chapter.content,
                    courseId: course.id,
                    totalTimeComplete: '5min',
                },
            })
            
            if (chapter.quiz.length>0) {
                const createdQuiz = await prisma.quiz.create({
                    data: {
                        title: chapter.quizName,
                        chapterId: createdChapter.id,
                        totalTimeComplete: chapter.quiz.totalTimeComplete || '10min',
                        totalMarks: chapter.quiz.totalMarks || chapter.quiz.length,
                        totalQuestion: chapter.quiz.length,
                    },
                })

                chapter.quiz.length!=0 && chapter.quiz.map(async (question) => {
                    const createdQuestion = await prisma.question.create({
                        data: {
                            question: question.question,
                            mark: question.mark || 1,
                            quizId: createdQuiz.id,
                        },
                    })
        
                    question.options.map(async (option) => {
                        const createdOption = await prisma.option.create({
                            data: {
                                text: option.text,
                                isCorrect: option.isCorrect,
                                questionId: createdQuestion.id,
                            },
                        })
    
                    })
                })
            }
        })

        feedbackQuestion.map(async (question) => {
            await prisma.feedbackQuestion.create({
                data: {
                    question: question,
                    courseId: course.id,
                },
            });
        })

        return res.status(200).json({message: "Successful created the course"})
    
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }

}

module.exports = { getAllCourse, getAllCourseParams, addCourse }
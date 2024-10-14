const prisma = require("../../index")

const getCourseCounts = async (courses) => {
    const courseCount = await Promise.all(
      courses.map(async (element) => {
        element.totalEnrolled = await prisma.courseProgress.count({
          where: { courseId: element.id },
        }) || 0;
  
        return element;
      })
    );
  
    return courseCount;
}

const getAllCourse = async (_,res)=>{

    try{
        const courses = await prisma.course.findMany({
            select:{
                id:true,
                title:true,
                description:true,
                totalTimeComplete:true,
                totalQuiz:true,
                totalChapter:true,
                startedAt:true,
                image:true
            }
        })
        
        const list = await getCourseCounts(courses)

        const recentlyAdded = list.sort((a, b) => 
            new Date(b.startedAt) - new Date(a.startedAt)
        ).slice(0, 4);

        return res.status(200).json({message: "Successful Retrived",data:{course:list,recentlyAdded}})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getAllCourseParams = async (req,res)=>{

    const { word } = req.query
    
    try{
        const courses = await prisma.course.findMany({
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
                startedAt:true,
                image:true
            }
        })
        
        const list = await getCourseCounts(courses)

        const recentlyAdded = list.sort((a, b) => 
            new Date(b.startedAt) - new Date(a.startedAt)
        ).slice(0, 4);

        return res.status(200).json({message: "Successful Retrived",data:{course:list,recentlyAdded}})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getSelected = async(req,res)=>{
    try{
        const {courseId} = req.query

        const courseStatus = await prisma.courseProgress.findFirst({
            where: {
              employeeId: Number(req.employeeId),
              courseId: Number(courseId),
            },
        })

        let course = null

        course = await prisma.course.findUnique({
            where:{
                id:Number(courseId)
            },
            select:{
                id: true,
                title: true,
                description: true,
                totalChapter: true,
                totalQuiz: true,
                totalTimeComplete:true,
                chapters: {
                    select: {
                        id: true,
                        title: true,
                        totalTimeComplete: true,
                    },
                },
            }
        })

        const courses = await getCourseCounts([course]) 
        
        const data = {...courses[0]}
        
        if(!courseStatus){
            data.courseStatus = "Join"
        }else{
            data.courseStatus = courseStatus.status
        }

        const chapterProgress = await prisma.courseProgress.findFirst({
            where: {
                employeeId: Number(req.employeeId),
                courseId: Number(courseId),
            },
            select:{
                progress:true,
                completedChapters:true
            }
        })

        data.chapterProgress = chapterProgress

        const feedback = await prisma.feedback.findFirst({
            where: {
                employeeId: Number(req.employeeId),
                courseId: Number(courseId),
            },
        })
        if(data.courseStatus === 'join' || feedback){
            if(!feedback){
                data.feedbackType = false
            }else{
                data.feedbackType = true
            }
            data.feedback = []
        }else{
            data.feedbackType = true
            const feed = await prisma.feedbackQuestion.findMany({where:{courseId:Number(courseId)}})
            
            data.feedback = feed
        }
        return res.status(200).json({message: "Successful Retrived",data:data})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createCourseProgress = async (req, res) => {
    const { courseId } = req.query;
  
    try {
      const newCourseProgress = await prisma.courseProgress.create({
        data: {
          employeeId: Number(req.employeeId),
          courseId: Number(courseId),
          progress: 0,
          completedChapters: 0, 
          status: "Enrolled",
          startedAt: new Date(),
          updatedAt: new Date()
        },
      });
  
      return res.status(201).json({
        message: "Course progress created successfully",
        data: newCourseProgress,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const addFeedback = async(req,res)=>{
    try{

        const {data} = req.body
       
        await prisma.feedback.create({
            data: {
              employee: {
                connect: { id: req.employeeId },
              },
              course: {
                connect: { id: Number(data[0].courseId) },
              },
              submittedAt: new Date(),
              responses: {
                create: data.map((response) => ({
                  feedbackQuestion: {
                    connect: { id: response.id },
                  },
                  response: response.rate,
                })),
              },
            },
        })

        return res.status(201).json({
            message: "Course feedback created successfully",
        })

    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}
 

module.exports = { getAllCourse, getAllCourseParams,  getSelected, createCourseProgress, addFeedback}
const prisma = require("../../index")


const getDashBoard = async(req,res)=>{
    try{

        const user = await prisma.employee.findFirst({
            where:{
                id:req.employeeId
            },
            select:{
                id:true,
                email:true,
                name:true,
                department:true,
                team:true,
                image:true
            }
        })


        const courseProgressEnrolled = await prisma.courseProgress.count({
            where:{
                employeeId:user.id,
                status: 'Enrolled'
            }
        })
        
        
        const courseProgressJoin = await prisma.courseProgress.count({
            where:{
                employeeId:user.id,
                progress:{
                    gt:0
                }
            }
        })

        
        const courseProgressCompleted = await prisma.courseProgress.count({
            where:{
                employeeId:user.id,
                status: 'Completed'
            }
        })

        user.courseCount = [courseProgressEnrolled,courseProgressJoin,courseProgressCompleted] 

        return res.status(200).json({message: "Successful Retrived",data:user})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const completedCourse =  async (userId) => {
  try {
    const completedCourses = await prisma.course.findMany({
      where: {
        progress: {
          some: {
            employeeId: Number(userId),
            status: 'Completed',
          },
        },
      },
      include: {
        progress: {
          where: {
            employeeId: Number(userId),
          },
          include: {
            course: true,
          },
        },
        chapters: {
          include: {
            quizzes: {
              include: {
                quizResults: {
                  where: {
                    employeeId: Number(userId),
                  },
                },
              },
            },
          },
        },
      },
    })

    const results = completedCourses.map(course => {
      const progress = course.progress[0]
      const completedChapters = progress.completedChapters
      const totalChapters = course.chapters.length

      const quizResults = course.chapters.flatMap(chapter =>
        chapter.quizzes.flatMap(quiz => 
          quiz.quizResults.filter(result => result.employeeId === Number(userId))
        )
      )

      const totalQuizzes = course.chapters.reduce((count, chapter) => 
        count + chapter.quizzes.length, 0
      )

      const totalScore = quizResults.reduce((sum, result) => sum + result.score, 0)
      const incompleteChaptersCount = totalChapters - completedChapters

      return{
        courseName: course.title,
        courseDescription: course.description,
        completedChapters,
        totalChapters,
        score: totalScore,
        courseImage: course.image,
        incompleteChaptersCount,
        totalQuizzes
      }
    })

    return results

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while fetching data.' })
  }
}

const onProgressCourse  = async (req, res) => {
  const userId = req.employeeId;

  try {
    const ongoingCourses = await prisma.course.findMany({
      where: {
        progress: {
          some: {
            employeeId: Number(userId),
            status: 'Enrolled',
          },
        },
      },
      include: {
        progress: {
          where: {
            employeeId: Number(userId),
          },
          include: {
            course: true,
          },
        },
        chapters: {
          include: {
            quizzes: {
              include: {
                quizResults: {
                  where: {
                    employeeId: Number(userId),
                  },
                },
              },
            },
          },
        },
      },
    });

    const results = ongoingCourses.map(course => {
      const progress = course.progress[0];
      const totalChapters = course.chapters.length;
      const completedChapters = progress.completedChapters;

      const pendingChaptersCount = totalChapters - completedChapters;

      const quizResults = course.chapters.flatMap(chapter =>
        chapter.quizzes.flatMap(quiz => 
          quiz.quizResults.filter(result => result.employeeId === Number(userId))
        )
      );

      const totalScore = quizResults.reduce((sum, result) => sum + result.score, 0);
      const pendingQuizzesCount = course.chapters.reduce((count, chapter) => {
        return count + chapter.quizzes.length - quizResults.filter(result => result.quizId === chapter.quizzes.id).length;
      }, 0);

      return {
        courseName: course.title,
        courseDescription: course.description,
        pendingChaptersCount,
        pendingQuizzesCount,
        courseImage: course.image,
        score: totalScore > 0 ? totalScore : 0,
      };
    });

    const completed = await completedCourse(userId)
    const data = {
        completedCourse:completed,
        onProgressCourse:results
    }
    
    return res.status(200).json({message: "Successful Retrived",data:data})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = { getDashBoard, onProgressCourse }
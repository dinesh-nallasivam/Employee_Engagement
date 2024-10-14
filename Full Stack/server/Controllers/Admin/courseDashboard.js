const prisma = require("../../index")

const monthReport =  async (req, res) => {
  const { departmentId } = req.query

  try {

    let progressData = []
    
    if(departmentId){
        progressData = await prisma.courseProgress.findMany({
            where: {
            ...(departmentId && { employee: { department: departmentId } }),
            },
            include: {
                course: true,
            },
        })
    }else{
        progressData = await prisma.courseProgress.findMany({
            include: {
              course: true
            },
          })
    }

    const completionRates = progressData.reduce((acc, progress) => {
      const month = new Date(progress.startedAt).toLocaleString('default', { month: 'long' })
      if (!acc[month]) {
        acc[month] = { total: 0, completed: 0 }
      }
      acc[month].total += 1
      acc[month].completed += progress.status === 'Completed' ? 1 : 0
      return acc
    }, {})

    const averageRates = Object.entries(completionRates).map(([month, { total, completed }]) => ({
      month,
      averageRate: (completed / total) * 100,
    }))

    return res.status(200).json({message: "Successful Retrived",data:averageRates})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const statusCount = async (req, res) => {
  const { departmentId } = req.query
  try {
    let courses = []
    if(departmentId){
        courses = await prisma.course.findMany({
          include: {
            progress: {
              where: {
                ...(departmentId && { employee: { department: departmentId } }),
              },
            },
          },
        })
    }else{
        courses = await prisma.course.findMany({
            include: {
              progress: true
            },
          })
    }

    const statusCounts = {
      enrolledCount: 0,
      inProgressCount: 0,
      completedCount: 0,
    }

    courses.forEach(course => {
      course.progress.forEach(progress => {
        if (progress.progress == 0) {
            statusCounts.enrolledCount += 1
        }else if(progress.progress >0 && progress.progress !== 100){
          statusCounts.inProgressCount += 1
        } else if (progress.progress === 100) {
          statusCounts.completedCount += 1
        }
      })
    })

    return res.status(200).json({message: "Successful Retrived",data:statusCounts})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

const topEmployee = async (req, res) => {
    const { departmentId } = req.query;
  
    try {
        let employees = []
        if(departmentId){
            employees = await prisma.employee.findMany({
              where: {
                ...(departmentId && { department: departmentId }),
              },
              include: {
                quizResults: true,
              },
            });
        }else{
            employees = await prisma.employee.findMany({
                include: {
                    quizResults: true,
                },
            });
        }
  
      const scores = employees.map(employee => ({
        id: employee.id,
        name: employee.name,
        department:employee.department,
        score: employee.quizResults.reduce((sum, result) => sum + result.score, 0),
      }));
  
      const topEmployees = scores
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      res.status(200).json({message:"sussfully retrived",data:topEmployees});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const avgMetrics = async (req, res) => {
    const { departmentId } = req.query;

    try {
        const courses = await prisma.course.findMany({
            include: {
                feedback: {
                    include: {
                        responses: true,
                    },
                },
                chapters: {
                    include: {
                        quizzes: {
                            include: {
                                quizResults: true,
                            },
                        },
                    },
                },
            },
        });

        let totalFeedbacks = 0;
        let totalScore = 0;
        let totalQuizCompletion = 0;
        let totalChapterCompletion = 0;
        let feedbackCount = 0;
        let totalEmployees = 0;

        courses.forEach(course => {
            course.feedback.forEach(feedback => {
                if (departmentId && feedback.employeeId?.department !== departmentId) return;

                feedbackCount++;
                totalFeedbacks += feedback.responses.length;
            });

            course.chapters.forEach(chapter => {
                const quizzes = chapter.quizzes;
                totalEmployees += quizzes.length;

                quizzes.forEach(quiz => {
                    const quizResults = quiz.quizResults.filter(result => {
                        return !departmentId || result.employeeId?.department === departmentId;
                    });

                    totalQuizCompletion += quizResults.length;
                    totalScore += quizResults.reduce((sum, result) => sum + result.score, 0);
                });

                totalChapterCompletion += chapter.totalTimeComplete ? 1 : 0;
            });
        });

        const avgFeedbackRate = feedbackCount > 0 ? (totalFeedbacks / feedbackCount) : 0;
        const avgScore = totalEmployees > 0 ? (totalScore / totalEmployees) : 0;
        const avgQuizCompletion = totalEmployees > 0 ? (totalQuizCompletion / totalEmployees) : 0;
        const avgChapterCompletion = totalEmployees > 0 ? (totalChapterCompletion / totalEmployees) : 0;

        res.status(200).json({message:"sussfull retrived",
            data:{
            avgFeedbackRate,
            avgScore,
            avgQuizCompletion,
            avgChapterCompletion,
        }});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


  
module.exports = { statusCount, monthReport, topEmployee, avgMetrics } 
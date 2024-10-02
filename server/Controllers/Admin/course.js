const prisma = require("../../index")

const getAllCourse = async (_,res)=>{

    try{
        const result = prisma.course.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                totalTimeComplete:true,
                totalQuiq:true,
                totalChapter:true
            }
        })

        return res.status(200).json({message: "Successful Retrived",data:[]})

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const getAllCourseParams = async (req,res)=>{

    const { word } = req.query
    
    try{
        const result = prisma.course.findMany({
            where:{
                name:{
                    contains:word
                }
            },
            select:{
                id:true,
                name:true,
                description:true,
                totalTimeComplete:true,
                totalQuiq:true,
                totalChapter:true
            }
        })

        return res.status(200).json({message: "Successful Retrived",data:result})

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const addCourse = async(req,res)=>{
    try{
        console.log(req.body)
        return res.status(200).json({message: "Successful created the course"})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = { getAllCourse, getAllCourseParams, addCourse }
import { useEffect, useState } from "react";
import PathDisplay from "../../components/Navbar/PathDisplay";
import SubNavbar from "../../components/Navbar/SubNavbar";
import CourseDetailCard from "../../components/Courses/CorseDetailCard";
import { IoMdPeople } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import { MdOutlineTopic } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import Materials from "../../components/Materials/Materils";
import courseImage from "../../assets/png/pexels-pixabay-159866.jpg"
import Axios from "axios"

function SelectedCourse({courseId,pathList,setPathList,handleNavigation}) {
    
    const [subNavbar,setSubNavbar] = useState(["About","Chapter & Quiz"])
    const [courseStatus,setCourseStatus] = useState(null)
    const [courseDescription,setCourseDescription] = useState(null)
    const [courseDetailList,setCourseDetailList] = useState([])
    const [courseChapterAndQuiz,setCourseChapterAndQuiz] = useState([])
    const [courseFeedBack,setCourseFeedBack] = useState([]) 
    const [subClick,setSubClick] = useState("About")

    const handleFeedBack = (feedBackIndex,rates)=>{
        const list = courseFeedBack
        list[feedBackIndex].rate = rates
        setCourseFeedBack([...list])
    }
   
    const handleCourseDetails  = (course)=>{
        setCourseDetailList([
            {
                icon:<IoMdPeople className="h-8 w-8"/>,
                name:"Total Enrollment",
                value:course.totalEnrolled
            },
            {
                icon:<MdAccessTime className="h-8 w-8"/>,
                name:"Total Duration",
                value:course.totalTimeComplete
            },
            {
                icon:<MdOutlineTopic className="h-8 w-8"/>,
                name:"Total Chapters",
                value:course.totalChapter
            },
            {
                icon:<MdOutlineQuiz className="h-8 w-8"/>,
                name:"Total Quiz",
                value:course.totalQuiz
            },
            {
                icon:<IoCheckmarkDone className="h-8 w-8"/>,
                name:"Total Marks",
                value:course.totalQuiz
            }
        ])
    }

    const fetch = async()=>{
        try{
            const res = await Axios.get("http://localhost:3000/employee/getSelectedCourse",{
                withCredentials:true,
                params: {courseId} 
            })
            if(res.status==200){
                const data = res.data.data
                
                handleCourseDetails(data)

                setCourseDescription(data.description)
                
                setCourseStatus(data.courseStatus)
                
                const list = data.chapters.map((item)=>(item.title))
                setCourseChapterAndQuiz([...list])
                
                if(data.feedbackType &&  data.feedback.length>0){
                    setCourseFeedBack([...data.feedback])
                }
                if (data.courseStatus !='Join' && subNavbar.length === 2 && !subNavbar.includes("FeedBack")) {
                    setSubNavbar((prev) => [...prev, "FeedBack"]);
                }
             }
        }catch(err){
            console.error(err.message)
        }
    }

    useEffect(()=>{
        fetch()  
    },[])

    const joinCourse = async(courseId)=>{
        try{
            if(courseStatus == "Join"){
                const res = await Axios.get("http://localhost:3000/employee/enrolled",{
                    withCredentials:true,
                    params: {courseId} 
                })
                if(res.status == 201){
                    fetch()
                }
            }
        }catch(err){
            console.error(err.message)
        }
    }

    const handleFeeadback = async(courseId)=>{
        try{
            const res = await Axios.post("http://localhost:3000/employee/courseFeedback",
                {data:courseFeedBack},{
                withCredentials:true
            })

            if(res.status==201){
                setCourseFeedBack([])
                fetch()
            }
        }catch(err){
            console.error(err.message)
        }
    }

    return (
        <div className="overflow-x-hidden h-full">
            <PathDisplay 
                pathList={pathList}
                handleNavigation={handleNavigation}
            />

            {
                pathList[pathList.length-1] == "Materials"? (
                    <Materials
                        courseId = {courseId}
                    />
                ) : (
                <>
                    
                    <div className="px-4 mt-4 relative">
                        <div className="w-full h-36">
                            <img src={courseImage} className="rounded-lg object-cover w-full h-36 opacity-85"/>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-36 flex items-center justify-center">
                            <p className="text-2xl font-bold text-white">
                                {pathList[pathList.length-1]}
                            </p>
                        </div>
                        {
                            courseStatus && (
                                <div
                                    className="cursor-pointer w-fit absolute right-8 p-2 px-4 bg-white text-black bottom-2 rounded-xl"
                                    onClick={()=>joinCourse(courseId)}
                                >
                                    {courseStatus}
                                </div>
                            )
                        }
                    </div>
            
                    <div className="w-full mx-auto md:w-[75%] my-5 px-4 pb-1 flex gap-4 justify-evenly border-b overflow-x-scroll hide-scrollbar">
                        {
                            subNavbar.map((element,index)=>{
                                if(index<3){
                                    return (
                                        <SubNavbar
                                            key={index}
                                            element={element}
                                            check={element==subClick}
                                            handleSubNavigation = {setSubClick}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
                    
        
                    {
                        subClick == "About" && (
                        <>
                            <div className="w-full px-4 my-6 flex flex-wrap justify-center gap-4">
                                {
                                    courseDetailList.map((element,index)=>(
                                        <CourseDetailCard
                                            element={element}
                                            key={index}
                                        />
                                    ))
                                }
                            </div>
        
                            <div className="w-full p-2 my-6 mt-8">
                                <p className="text-xl font-medium text-center">
                                    Introduction
                                </p>
                                {
                                    courseDescription && (
                                        <div className="my-3 text-sm font-normal text-center">
                                            {courseDescription}
                                        </div>
                                    )
                                }
                            </div>
                        </>
                        )
                    }
        
        
                    {
                        subClick == "Chapter & Quiz" && (
                            <div className="w-full p-2 my-6 mt-8">
                                <p className="text-xl font-medium text-center">
                                    Course Flow
                                </p>
        
                                <div className="my-6 w-[97%] sm:w-[75%] mx-auto">
                                {
                                    courseChapterAndQuiz.length!=0 && courseChapterAndQuiz.map((element,index)=>(
                                        <div 
                                            onClick={()=>{courseStatus!="Join" && setPathList([...pathList,"Materials"])}}
                                            className={`cursor-pointer border-b border-slate-300 ${index%2==0? "rounded-bl-3xl rounded-tr-3xl bg-slate-200":""}`}>
                                            <p className="p-3 pl-6 text-lg font-medium">
                                                {index+1}. {element}
                                            </p>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        )
                    }
        
                    {
                        subClick == "FeedBack" && courseStatus!='Join' && (
                            <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border">
                                {
                                    courseFeedBack.length == 0 ?(
                                        <div className="w-full border">
                                            <p className="text-center p-2 text-base font-normal text-balck bg-slate-200">
                                               FeedBack is already submitted 
                                            </p>
                                        </div>
                                    ):(
                                        <>
                                            <h1 className="text-center text-xl font-semibold text-gray-800 mb-8">
                                                Feedback Form
                                            </h1>
                                            <div>
                                            {
                                                courseFeedBack.map((element,index)=>(
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 font-medium mb-2">
                                                            {index+1}. {element.question}
                                                        </label>
                                                        <div className="flex gap-2">
                                                            {
                                                                [...Array(5)].map((_, subIndex) => (
                                                                    <p 
                                                                        key={subIndex} 
                                                                        className="cursor-pointer"
                                                                        onClick={()=>handleFeedBack(index,subIndex+1)}
                                                                    >
                                                                        <FaStar className={`w-6 h-6 ${subIndex<parseInt(element.rate) ? "text-primarycolor" :"text-slate-300"}`}/>
                                                                    </p>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                    
                                            <button
                                                type="submit"
                                                className="my-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                                                onClick={()=>handleFeeadback(courseId)}
                                            >
                                                Submit Feedback
                                            </button>
                                            </div>
                                        </>
                                    )
                                }
                            </div> 
                        )
                    }
                </>
                )
            }
        </div>
    );
}

export default SelectedCourse;
import { useEffect, useState } from "react";
import CourseProgress from "../../components/Courses/CourseProgress";

import Axios from "axios"

function MyCourses() {
    
    const [onProgressCourse, setOnProgressCourse] = useState([])
    const [completed,setCompleted,] = useState([])

    useEffect(()=>{
        const fetch = async()=>{
            try{

                const res = await Axios.get("http://localhost:3000/employee/onProgressCourse",{
                    withCredentials:true
                })
                if(res.status==200){
                    const data = res.data.data
                    console.log(data)
                   setCompleted([...data.completedCourse])
                   setOnProgressCourse([...data.onProgressCourse])
                }
            }catch(err){
                console.error(err.message)
            }
        }

        fetch()
    },[])

    return (
        <>
            <div className="p-3">
                <p className="text-xl font-medium my-4 ">
                    On Progress
                </p>
                {
                    onProgressCourse.length>0 && onProgressCourse.map((element,index)=>(
                        <div className="my-2">
                            <CourseProgress
                                key={index}
                                check={true}
                                element={element}
                            />
                        </div>
                    ))
                }
            </div>
            <div className="p-3">
                <p className="text-xl font-medium my-4 ">
                    Completed
                </p>
                {
                    completed.length>0 && completed.map((element,index)=>(
                        <div className="my-2">
                            <CourseProgress
                                key={index}
                                check={false}
                                element={element}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default MyCourses;
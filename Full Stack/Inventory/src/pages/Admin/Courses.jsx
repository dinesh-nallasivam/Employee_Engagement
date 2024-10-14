import Add from "../../components/formComponent/Add"
import { useState, useEffect } from "react";
import Search from "../../components/formComponent/Search"
import CourseAvailable from "../../components/Courses/CourseAvailable";
import AddCourse from "./AddCourse";
import CourseEngagement from "./CourseEngagement";
import Axios from "axios"
import NoData from "../../components/formComponent/NoData";

function Courses({setPopUps}) {

    const [search,setSearch] = useState('')
    const [pathList,setPathList] = useState(["Courses"])
    const [courseList,setCourseList] = useState([])

    const handleNavigation = (name)=>{
        const pathIndex = pathList.indexOf(name)

        const list = pathList.filter((element,index)=>{
            if(index<=pathIndex) return element
        })

        setPathList([...list])
    }

    const handleSelectedCourse = (courseName)=>{
        setPathList(prev => [...prev,courseName])
    }

    useEffect(()=>{
        const getData = async()=>{
            try{
                const res = await Axios.get("http://localhost:3000/admin/getCourse",{withCredentials:true})
                if(res.status==200){
                    setCourseList([...res.data.data])
                }
            }catch(err){
                console.error(err.message)
            }
        }

        getData()
    },[pathList])
    
    const filter = async()=>{
        if(search.trim()){
            try{
                const word = search.trim()
                const res = await Axios.get("http://localhost:3000/admin/getCourseSearch",
                    {
                        params: { word },
                        withCredentials:true
                    })
                if(res.status==200){
                    setSearch('')
                    setCourseList([...res.data.data])
                }
            }catch(err){
                console.error(err.message)
            }
        }
    }
    

    return (
        <div className=" p-3 w-full h-full">
            
            {
                pathList[pathList.length-1] == "Add New Course" && (
                    <AddCourse
                        setPopUps={setPopUps}
                        pathList={pathList}
                        handleNavigation={handleNavigation}
                    />
                )
            }

            {
                pathList.length == 1 && 
                (
                <>  
                    <div className="flex p-2 justify-end">
                        <Add
                            name="Add new course"
                            handleClick={()=>handleSelectedCourse("Add New Course")}
                        />
                    </div>

                    <div className="my-5">
                        <Search
                            search={search}
                            setSearch={setSearch}
                            handleClick={()=>filter()}
                        />
                    </div>

                    <div className="px-2 my-10">
                        {
                            courseList.length == 0? (
                                <NoData/>
                            ):(
                                courseList.map((element,index)=>(
                                    <div className="w-full py-3">
                                        <CourseAvailable
                                            key={index}
                                            element={element}
                                            handleSelectedCourse={handleSelectedCourse}
                                        />
                                    </div>

                                ))
                            )
                        }
                    </div>
                </>
                )
            }

            {
                pathList.length !=1 && pathList[pathList.length-1] != "Add New Course" && (
                    <div className="w-full my-2">
                        <CourseEngagement
                            pathList={pathList}
                            handleNavigation={handleNavigation}
                            courseName="courseName"
                        />
                    </div>
                )
            }
        </div>
    );
}

export default Courses;
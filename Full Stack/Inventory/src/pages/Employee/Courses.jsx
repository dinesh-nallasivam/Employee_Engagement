import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Card from "../../components/Courses/CourseCard"
import SelectedCoursePage from "./SelectedCourse"
import Axios from "axios"
import NoData from "../../components/formComponent/NoData";

function Courses() {

    const [search,setSearch] = useState('')
    const [pathList,setPathList] = useState(["Courses"])
    const [recentlyAddCourse,setRecentlyAddCourse] = useState([])
    const [courseList,setCourseList] = useState([])
    const [courseId,setCourseId] = useState('')

    const handleNavigation = (name)=>{
        const pathIndex = pathList.indexOf(name)

        const list = pathList.filter((element,index)=>{
            if(index<=pathIndex) return element
        })

        setPathList([...list])
    }

    const handleSelectedCourse = (courseName,id)=>{
        setCourseId(id)
        setPathList(prev => [...prev,courseName])
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get("http://localhost:3000/employee/getCourse", { withCredentials: true });
                if (res.status === 200) {
                    setCourseList([...res.data.data.course])
                    setRecentlyAddCourse([...res.data.data.recentlyAdded])
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, [])

    const filter = async () => {
        if(search.trim()){
            const word  = search.trim()
            try {
                const res = await Axios.get("http://localhost:3000/employee/getCourseSearch", {
                    params: { word },
                    withCredentials:true
                });
                if (res.status === 200) {
                    setCourseList([...res.data.data.course])
                    setRecentlyAddCourse([...res.data.data.recentlyAdded])
                }
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    return (
        <div className="h-full">
            {
                pathList.length > 1 ? 
                (
                    <SelectedCoursePage
                        courseId={courseId} 
                        pathList={pathList}
                        setPathList={setPathList}
                        handleNavigation={handleNavigation}
                    />  
                ):(
                    <div className="p-3">
                        <div className="flex gap-4 w-full  justify-center">
                            <div className="border w-[75%] p-1 pl-4 h-10 rounded-lg flex items-center">
                                <input 
                                    type="text" 
                                    name="search" 
                                    id="search" 
                                    value={search}
                                    className="focus:outline-0 w-full"
                                    onChange={(e)=>setSearch(e.target.value)}
                                />
                            </div>
                            <div className="border hover:bg-zinc-300 w-10 p-1 rounded-lg flex justify-center items-center" onClick={()=>filter()}>
                                <CiSearch className=" w-full h-full p-1 "/>
                            </div>              
                        </div>

                        <div className="my-8 sm:mx-6 mx-2">
                            <p className="font-bold text-2xl mb-2 text-gray-800 my-4">
                                Recently Added Courses
                            </p>
                            <div className="flex sm:justify-normal justify-center px-4">
                                {
                                    recentlyAddCourse.length==0? (
                                        <NoData/>
                                    ):(
                                        recentlyAddCourse.map((element,index)=>(
                                            <div className="p-3">
                                                <Card
                                                    key={index}
                                                    handleSelectedCourse={handleSelectedCourse} 
                                                    element={element}
                                                />
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>

                        <div className="my-8 sm:mx-6 mx-2">
                            <p className="font-bold text-2xl mb-2 text-gray-800 my-4">
                                Courses
                            </p>
                            <div className="flex sm:justify-normal justify-center px-4">
                                {
                                    courseList.length==0? (
                                        <NoData/>
                                    ):(
                                        courseList.map((element,index)=>(
                                            <div className="p-3">
                                                <Card
                                                    key={index}
                                                    handleSelectedCourse={handleSelectedCourse} 
                                                    element={element}
                                                />
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}

export default Courses;
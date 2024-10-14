import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import ChapterSideBar from "./ChapterSideBar";
import Chapter from "./Chapter";
import Quiz from "./Quiz";
import Axios from "axios"

function Materials({courseId}) {

    const [check,setCheck] = useState(true)
    const [sideBarClick,setSideBarClick] = useState({})
    const [materialDetails,setMaterialDetails] = useState([])
    let startTime;

    const startCourse = () => {
        startTime = Date.now();
    };

    const endCourse = async () => {
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - startTime) / 1000);

        await Axios.post("http://localhost:3000/employee/updateTimeSpent", {
            courseId: courseId,
            timeSpent: timeSpent,
        },{
            withCredentials:true
        });
    };

    useEffect(() => {
        startCourse(); // Start timing when component mounts

        return () => {
            endCourse(); // Stop timing and send data when component unmounts
        };
    }, []);

    const fetchChapters = async (indx)=>{

        try{
            const res = await Axios.get("http://localhost:3000/employee/getChapter",
            {
                params:{courseId},
                withCredentials:true
            })

            if(res.status==200){
                const data = res.data.data
                setMaterialDetails([...data])
                if(!indx){
                    data[0].index = 0
                }
                if(indx){
                    if(indx <materialDetails.length){
                        setSideBarClick(materialDetails[indx])
                    }
                }else{
                    setSideBarClick({...data[0]})
                }
            }
        }catch(err){
            console.error(err.message)
        }
    }

    useEffect(()=>{
        fetchChapters()
    },[])

    const handleIndex = (index)=>{
        fetchChapters(index)
    }

    return (
        <div className="flex h-[calc(100%-3rem)]">
            <div className="w-fit h-full border-r-0.5 border-slate-300">
                <div className="flex flex-row-reverse py-3 px-2">
                    <div className="cursor-pointer" onClick={()=>setCheck(prev=>!prev)}>
                        {
                            check ? 
                                <MdKeyboardDoubleArrowRight /> : <MdKeyboardDoubleArrowLeft />
                        }
                    </div>
                </div>
                {
                    check && (
                        <ChapterSideBar
                            materialDetails = {materialDetails}
                            setSideBarClick={setSideBarClick}
                        />
                    )
                }
            </div>
            <div className="w-full h-full overflow-hidden">
                <div className="w-full h-full overflow-auto">
                    {
                        sideBarClick.type == "quiz"? (
                            <Quiz
                                handleIndex = {handleIndex} 
                                quizDetails = {sideBarClick}
                            />
                        ):(
                            <Chapter
                                handleIndex = {handleIndex}
                                chapterDetails = { sideBarClick }
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Materials;
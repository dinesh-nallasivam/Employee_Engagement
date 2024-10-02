import { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import ChapterSideBar from "./ChapterSideBar";
import Chapter from "./Chapter";
import Quiz from "./Quiz";

function Materials({courseName}) {

    const [check,setCheck] = useState(true)

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
                        <ChapterSideBar/>
                    )
                }
            </div>
            <div className="w-full h-full">

                {/* <Chapter/> */}
                <Quiz/>
            </div>
        </div>
    );
}

export default Materials;
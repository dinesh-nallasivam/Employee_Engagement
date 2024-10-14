import { TiTickOutline } from "react-icons/ti";

function ChapterSideBar({materialDetails,setSideBarClick}) {
    
    const handle = (element,index)=>{
        element.index = index
        setSideBarClick(element)
    }

    return (
        materialDetails.map((element,index)=>(
            <div className="p-2" key={index} onClick={()=>handle(element,index)}>
                <div className="flex items-center gap-2">
                    {
                        !element.isComplete ? (
                            <p className="text-base font-medium border-0.5 w-9 h-9 rounded-full flex justify-center items-center">
                                {index+1}
                            </p>
                        ):(
                            <p className="border-0.5 w-9 h-9 rounded-full flex justify-center items-center overflow-hidden">
                                <TiTickOutline className="w-full h-full bg-green text-white" />
                            </p>
                        )
                    }
                    <p className="text-base font-medium truncate w-full max-w-[200px]">
                        {element.title}
                    </p>
                </div>
            </div>
        ))
     );
}

export default ChapterSideBar;
import Axios from "axios"

function Chapter({chapterDetails,handleIndex}) {
   
    const handleSubmit = async ()=>{
        try{
             
            const courseId = chapterDetails.courseId

            const res = await Axios.get("http://localhost:3000/employee/chapterUpdate",{
                withCredentials:true,
                params: {courseId} 
            })
            if(res.status == 200){
                handleIndex(chapterDetails.index+1)
            }
        }catch(err){
            console.error(err.message)
        }
    }

    return (
        <div className="p-4 w-full">
            <div className="flex items-center">
                <h1 className="w-[75%] text-2xl font-medium my-5 text-center">
                    {chapterDetails.title}
                </h1>
                <div className="flex items-center">
                    <div className="flex gap-1 shadow-mdborder rounded-lg">
                        <p className="text-base font-normal">
                            Total Duration :
                        </p>
                        <div className="text-base font-medium">
                            {chapterDetails.totalTimeComplete}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-base font-normal">
                <div className="mt-4 w-full sm:w-[88%] sm:mx-auto">
                    <div className="p-4 mt-2">
                    <div dangerouslySetInnerHTML={{ __html: chapterDetails.content }} />
                    </div>
                </div>
            </div>
            <div className="my-5 p-9 flex flex-row-reverse">
                {
                    chapterDetails.isComplete ? (
                        <div className="flex items-center p-2 px-4 rounded-md bg-green-100 border border-green-400 text-green-700 transition-all duration-300 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                            <p className="text-base font-normal">
                                Successfully marked as completed!
                            </p>
                        </div>
                    ) : (
                        <button 
                            onClick={()=>handleSubmit()}
                            className="w-fit p-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-base font-normal transition duration-300 ease-in-out">
                            Save    
                        </button>               
                    )
                }
            </div>
        </div>
    );
}

export default Chapter;
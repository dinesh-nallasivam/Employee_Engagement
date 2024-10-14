
import { IoIosArrowForward } from "react-icons/io";

function CourseAvailable({handleSelectedCourse,element}) {
    return (
        <div className="w-full rounded-lg border p-2 flex items-start gap-3">
            <div className="rounded-xl w-24 h-24 border overflow-hidden shadow-sm">
                <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:3000${element.image}`}
                    alt="image"
                />
            </div>
            <div className="w-fit grow">
                <h2 className="font-bold text-xl mb-2 text-gray-800">
                    {element.title}
                </h2>
                <p className="text-gray-700 text-base line-clamp-2">
                    {element.description}    
                </p>
                <div className="flex gap-4 my-2">
                    <div className="flex justify-between w-fit">
                        <p className="font-normal text-sm">
                            Total Chapters : 
                        </p>
                        <p className="font-medium text-base pl-1">
                            {element.totalChapter}
                        </p>
                    </div>
                    <div className="flex justify-between w-fit">
                        <p className="font-normal text-sm">
                            Total Quiz : 
                        </p>
                        <p className="font-medium text-base pl-1">
                            {element.totalQuiz}
                        </p>
                    </div>
                    <div className="flex justify-between w-fit">
                        <p className="font-normal text-sm">
                            Total Duration : 
                        </p>
                        <p className="font-medium text-base pl-1">
                            {element.totalTimeComplete}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center p-1 cursor-pointer" onClick={()=>handleSelectedCourse("name")}>
                <IoIosArrowForward  className="h-24 w-12 text-slate-400"/>
            </div>
        </div>
    );
}

export default CourseAvailable;
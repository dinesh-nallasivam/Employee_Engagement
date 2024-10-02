
import { IoIosArrowForward } from "react-icons/io";

function CourseProgress() {
    return (
        <div className="w-full rounded-lg border p-2 flex items-start gap-3">
            <div className="rounded-xl w-24 min-h-20 max-h-24 border overflow-hidden shadow-sm">
                <img className="w-full h-full object-cover" src="" alt="image" />
            </div>
            <div className="w-fit">
                <h2 className="font-bold text-xl mb-2 text-gray-800">
                    header
                </h2>
                <p className="text-gray-700 text-base line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Fusce nec felis et orci facilisis suscipit.
                </p>
                <div className="flex gap-4 my-2">
                    <div className="flex justify-between w-fit">
                        <p className="font-normal text-sm">
                            Pending Chapters : 
                        </p>
                        <p className="font-medium text-base pl-1">
                            3
                        </p>
                    </div>
                    <div className="flex justify-between w-fit">
                        <p className="font-normal text-sm">
                            Pending Quiz : 
                        </p>
                        <p className="font-medium text-base pl-1">
                            3
                        </p>
                    </div>
                    <div className="flex justify-between w-fit">
                        <p className="font-normal text-sm">
                            Score : 
                        </p>
                        <p className="font-medium text-base pl-1">
                            3
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center p-1 cursor-pointer">
                <IoIosArrowForward  className="h-24 w-12 text-slate-400"/>
            </div>
        </div>
    );
}

export default CourseProgress;
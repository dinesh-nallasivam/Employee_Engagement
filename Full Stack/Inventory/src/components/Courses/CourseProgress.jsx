
function CourseProgress({element,check}) {
    return (
        <div className="w-full rounded-lg border p-2 flex items-start gap-3">
           <div className="rounded-xl w-24 h-24 border overflow-hidden shadow-sm">
                <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:3000${element.courseImage}`}
                    alt="image"
                />
            </div>
            <div className="w-fit grow">
                <h2 className="font-bold text-xl mb-2 text-gray-800">
                    {element.courseName}
                </h2>
                <p className="text-gray-700 text-base line-clamp-2">
                    {element.courseDescription}
                </p>
                <div className="flex gap-4 my-2">
                    <div className="flex justify-between w-fit">
                        <p className="font-normal text-sm">
                            {
                                check ? "Pending Chapters :":"Total Chapters : " 
                            } 
                        </p>
                        <p className="font-medium text-base pl-1">
                            {
                                check? element.pendingChaptersCount: element.totalChapters 
                            }
                        </p>
                    </div>
                    <div className="flex justify-between w-fit">
                        <p className="font-normal text-sm">
                            {
                                check? "Pending Quiz :" : "Total Quiz : "
                            } 
                        </p>
                        <p className="font-medium text-base pl-1">
                            {
                                check? element.pendingQuizzesCount : element.totalQuizzes 
                            }
                        </p>
                    </div>
                    <div className="flex justify-between w-fit">
                        <p className="font-normal text-sm">
                            Score : 
                        </p>
                        <p className="font-medium text-base pl-1">
                            {element.score}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseProgress;
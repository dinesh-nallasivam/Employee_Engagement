function CourseDetailCard({element}) {
    return (
        <div className="hover:shadow-lg p-2 px-8 bg-slate-200 w-40 h-28 border rounded-md flex flex-col justify-center">
            <div className="flex justify-center">
                {element.icon}
            </div>
            <p className="text-center text-lg font-medium text-nowrap">
                {element.value}  
            </p>
            <p className="text-center text-sm font-light text-nowrap">
                {element.name}   
            </p>
        </div>
    );
}

export default CourseDetailCard;
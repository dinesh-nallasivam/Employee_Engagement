import { MdKeyboardArrowRight } from "react-icons/md";

function PathDisplay({ pathList, handleNavigation }) {
    return (
        <div className="w-full px-4 pt-4 pb-2 flex gap-1 overflow-auto hide-scrollbar items-center border-b-0.5">
            {pathList.map((element, index) => {
                return (
                    <div 
                        className="w-fit flex gap-1 cursor-pointer items-center" 
                        key={index}
                        onClick={()=>handleNavigation(element)}
                    >
                        <p className={`text-sm ${index !== pathList.length - 1 ? "text-black-900 font-base" : "text-black-900 font-medium"}`}>
                            {element}
                        </p>
                        {
                            index !==pathList.length-1 && (
                                <MdKeyboardArrowRight className={index !== pathList.length-1? "opacity-3":""}/>
                            )
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default PathDisplay
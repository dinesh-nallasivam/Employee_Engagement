import { FaPlus } from "react-icons/fa";

function Add({name,handleClick}) {
    return (
        <div 
            className="w-fit p-2 rounded-md bg-primary flex gap-2 items-center cursor-pointer"
            onClick={handleClick}
        >
            <FaPlus className="text-white"/>
            <p className="  text-white text-base font-medium ">
                {name}
            </p>
        </div>
    );
}

export default Add;
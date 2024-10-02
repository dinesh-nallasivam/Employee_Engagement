import React from 'react';
import { IoMdPeople } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";

const CourseCard = ({ imageSrc, title,handleSelectedCourse }) => {
  
    const retn = (s)=>{
        return(
            <div className='flex items-start gap-2 my-1 mt-2 '>
                <div className='mt-1'>
                    {s} 
                </div>
                <div >
                    <p className="text-gray-700 text-base line-clamp-2">
                        Total Enrolled 
                    </p>
                    <p className="text-gray-700 text-base line-clamp-2">
                        10000  
                    </p>
                </div>          
            </div>
        )
    }

    return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg" onClick={()=>handleSelectedCourse("name")}>
      <img className="w-full h-40 object-cover" src={imageSrc} alt="CourseCard image" />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">
          {title}
        </h2>
        <div className='flex gap-4 justify-between'>
            {
                retn(<IoMdPeople/>)
            }
            {
                retn(<MdDateRange />)
            }
        </div>
            {
                retn(<MdAccessTime />)
            }
        <p className="text-gray-700 text-base line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Fusce nec felis et orci facilisis suscipit.
        </p>
      </div>
    </div>
  );
};

export default CourseCard;

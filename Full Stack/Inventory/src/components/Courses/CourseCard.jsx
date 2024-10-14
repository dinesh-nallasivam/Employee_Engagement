import React from 'react';
import { IoMdPeople } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";

const CourseCard = ({element,handleSelectedCourse }) => {
  
    const retn = (s,text,value)=>{
        return(
            <div className='flex items-start gap-2 my-1 mt-2 '>
                <div className='mt-1'>
                    {s} 
                </div>
                <div >
                    <p className="text-gray-700 text-base line-clamp-2">
                        {text}
                    </p>
                    <p className="text-gray-700 text-base line-clamp-2 text-center">
                        {value} 
                    </p>
                </div>          
            </div>
        )
    }
    
    return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg" onClick={()=>handleSelectedCourse(element.title,element.id)}>
      <img className="w-full h-40 object-cover" src={`http://localhost:3000${element.image}`} alt="CourseCard image" />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800 text-center">
          {element.title}
        </h2>
        <div className='flex gap-4 justify-between'>
            {
                retn(<IoMdPeople/>,"Total Enrolled",element.totalEnrolled)
            }
            {
                retn(<MdDateRange />,"Total Duration",element.totalTimeComplete)
            }
        </div>
            {
                retn(<MdAccessTime />,"Total Chapter",element.totalChapter)
            }
        <p className="text-gray-700 text-base line-clamp-2">
            {element.description}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;

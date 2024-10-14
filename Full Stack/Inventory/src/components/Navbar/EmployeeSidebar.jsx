import { RxDashboard } from "react-icons/rx";
import SidebarComponent from "./SidebarComponent";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiHtmlacademy } from "react-icons/si";

function EmployeeSidebar() {
    
   const  sidebarDetails = [
        {
            to:"/employee/dashboard",
            check:"/dashboard",
            name:"Dashboard",
            icon:<RxDashboard className="w-6 h-6"/>
        },
        {
            to:"/employee/courses",
            check:"/courses",
            name:"Courses",
            icon:<FaChalkboardTeacher className="w-6 h-6"/>
        },
        {
            to:"/employee/myCourses",
            check:"/myCourses",
            name:"MyCourses",
            icon:<SiHtmlacademy className="w-6 h-6"/>
        }
    ]

    return (
        <div className="my-5 md:px-2">
            {
                sidebarDetails.map((element,index)=>(
                    <SidebarComponent
                        key={index}
                        sidebarDetails={element}
                    />
                ))
            }
        </div> 
    );
}

export default EmployeeSidebar;
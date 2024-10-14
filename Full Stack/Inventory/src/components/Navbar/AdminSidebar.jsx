import { RxDashboard } from "react-icons/rx";
import SidebarComponent from "./SidebarComponent";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";

function AdminSidebar() {
    
   const  sidebarDetails = [
        // {
        //     to:"/admin/dashboard",
        //     check:"/dashboard",
        //     name:"Dashboard",
        //     icon:<RxDashboard className="w-6 h-6"/>
        // },
        {
            to:"/admin/courses",
            check:"/courses",
            name:"Courses",
            icon:<FaChalkboardTeacher className="w-6 h-6"/>
        },
        {
            to:"/admin/register",
            check:"/register",
            name:"Register",
            icon:<MdGroupAdd className="w-6 h-6"/>
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

export default AdminSidebar;
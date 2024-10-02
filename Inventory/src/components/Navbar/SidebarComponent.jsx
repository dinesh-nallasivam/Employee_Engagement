import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function SidebarComponent({sidebarDetails}) {
    
    const location = useLocation();

    return (
        <NavLink to={sidebarDetails.to}>
            <div className="m-2">
                <div className={`flex gap-3 items-center p-2 ${location.pathname == sidebarDetails.check?"rounded-md bg-primarycolor text-white":""}`}>
                    {sidebarDetails.icon}
                    <p className={`hidden md:block text-base text-medium ${location.pathname == sidebarDetails.check?"text-white":"text-black "}`}>
                        {sidebarDetails.name}
                    </p>
                </div>
            </div>
        </NavLink> 
    );
}

export default SidebarComponent;
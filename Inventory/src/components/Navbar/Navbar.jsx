import logo from "../../assets/png/logo_icon.png"
import logout from "../../assets/png/logout.png"
import bell from "../../assets/png/bell.png"
import Axios from "axios"
import { useNavigate } from 'react-router-dom';

function Navbar() {
    
    const navigate = useNavigate()

    const logoutFunction = async()=>{
        try{
            const res = await Axios.get("http://localhost:3000/authentication/logout",{withCredentials:true})
            if(res.status==200){
                navigate("/login")
            }
        }catch(err){
            console.error(err.message)
        }
    }

    return (
        <div className="sticky w-full p-1 flex justify-between items-center shadow-md">
            <div className="w-fit">
                <div className="w-12 h-12 flex flex-nowrap items-center">
                    <img src={logo} alt="logo" />
                    <p className="text-lg text-medium w-fit leading-none">Thunder Bold</p>
                </div>
            </div>
            
            <div className="w-fit flex gap-5 pr-3">
                <div>
                    <img src={logout} alt="logout" className="cursor-pointer" onClick={logoutFunction}/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
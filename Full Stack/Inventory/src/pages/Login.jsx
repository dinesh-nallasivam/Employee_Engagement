import { useState } from "react";
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
import facebook from "../assets/png/facebook.png"
import tweeter from "../assets/png/tweeter.png"
import google from "../assets/png/google.png"

function Login() {
    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    
    const loginFunction = async()=>{
        try{
            if(email && password){
                let role = selectedOption
                if(selectedOption == "Employee"){
                    role = "USER"
                }
                const res = await Axios.post("http://localhost:3000/authentication/login",{
                    email,
                    password,
                    role
                },{withCredentials:true})
                if(res.status==200){
                    setEmail("")
                    setPassword("")
                    if(res.data.data == "ADMIN"){
                        navigate("/admin/courses")
                    }else{
                        navigate("/employee/dashboard")
                    }
                 }
            } 
        }catch(err){
            console.error(err.message)
        }
    }

    return (
        <div className="h-[100%] w-full flex justify-center items-center">
            <div className="p-2 py-5 h-fit w-[70%] md:w-[50%] lg:w-[35%] xl:w-[25%] shadow-login-shadow rounded-lg">
                <div className="p-3">
                    <p className="text-center text-primary text-blue-600 text-2xl">
                        Welcome back
                    </p>
                    <p className="text-center my-2 md:w-[75%] md:mx-auto">
                        Login to your account by entering your account details
                    </p>
                </div>
                <div className="my-5 mx-5" >
                    <div className="mb-3">
                        <input 
                            type="email" 
                            className="form-control p-2 w-full border rounded-md text-sm text-normal focus:outline-primary" 
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control p-2 w-full border rounded-md text-sm text-normal focus:outline-primary" 
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 flex justify-center gap-2">
                        <label className="block mb-2">
                            <input
                                type="radio"
                                value="Employee"
                                checked={selectedOption === 'Employee'}
                                onChange={handleOptionChange}
                                className="mr-2"
                            />
                            Employee
                        </label>
                        <label className="block mb-2">
                            <input
                                type="radio"
                                value="Admin"
                                checked={selectedOption === 'Admin'}
                                onChange={handleOptionChange}
                                className="mr-2"
                            />
                            Admin
                        </label>
                    </div>

                    <div className="my-2">
                        <button className="w-full px-3 py-2 bg bg-primary rounded-md text-md text-white" onClick={loginFunction}>
                            Log In
                        </button>
                    </div>
                </div>

                {/* <div className="relative w-[75%] mx-auto mt-10">
                    <hr className="my-2"/>
                    <p className="text-center text-sm bg-white fw-normal absolute -top-2 left-[35%]">
                        Or login with
                    </p>
                </div>
                <div className="mt-7 w-fit mx-auto flex justify-content-center items-center space-x-3">
                    <img src={facebook} alt="facebook" className="w-8 h-8 rounded-full overflow-hidden border object-cover"/>
                    <img src={google} alt="google" className="w-8 h-8 rounded-full overflow-hidden border object-cover"/>
                    <img src={tweeter} alt="tweeter" className="w-8 h-8 rounded-full overflow-hidden border object-cover"/>
                </div> */}
            </div>
        </div>
    );
}

export default Login;
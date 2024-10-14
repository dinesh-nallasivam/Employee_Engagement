import { useEffect, useState } from "react";
import  Doughnut  from "../../components/DashBoard/Doughnut"
import Axios from "axios"
import im from "../../../../server/Routes/uploads/image-1728534136754-612959375.png"

function Dashboard() {
    const [employee,setEmployee] = useState({});
    const [graph,setGraph]= useState([])
    useEffect(()=>{
        const fetch = async()=>{
            try{

                const res = await Axios.get("http://localhost:3000/employee/dashboard",{
                    withCredentials:true
                })
                if(res.status==200){
                    const data = res.data.data
                    setEmployee({
                        name: data.name,
                        email: data.email,
                        department:data.department,
                        team: data.team,
                        image: data.image              
                    })
                    setGraph([...data.courseCount])
                }
            }catch(err){
                console.error(err.message)
            }
        }
        
        fetch()
    },[])

    return (
        <div className="p-3 md:flex w-full ">
            <div className=" w-full md:w-1/2 p-5">
                {
                    Object.keys(employee).length>0 && (
                        <div className="shadow-lg rounded-lg p-5 flex items-start">
                            <img
                                src={`http://localhost:3000${employee.image}`}
                                alt={`${employee.name}'s photo`}
                                className="w-32 h-32 rounded-lg mb-4 p-1 border"
                            />
                            <div className="pl-8">
                                <h2 className="text-xl font-semibold">{employee.name}</h2>
                                <p className="text-gray-600 text-base font-normal my-2">
                                    Email: <span className="font-medium text-base">{employee.email}
                                </span></p>
                                <p className="text-gray-600 text-base font-normal my-2">
                                    Department: <span className="font-medium text-base">{employee.department}</span>
                                </p>
                                <p className="text-gray-600">
                                    Team: <span className="font-medium text-base">{employee.team}</span>
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="p-2 w-full md:w-1/2">
                {
                    graph.length>0 && (
                        <Doughnut
                            graph={graph}
                        />
                    )
                }
            </div>

        </div>
    );
}

export default Dashboard;

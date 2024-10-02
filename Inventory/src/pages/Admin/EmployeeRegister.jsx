import React, { useState } from 'react';
import Axios from "axios"

const EmployeeRegister = () => {
  const [employee, setEmployee] = useState({
    email: '',
    name: '',
    password: '',
    department: '',
    team: '',
    role: 'USER'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
      try{
        if(employee.email && employee.name && employee.password && employee.department && employee.team){
            const res = await Axios.post("http://localhost:3000/admin/employee",{
              ...employee
            },{withCredentials:true})
            if(res.status==201){
                setEmployee({
                  email: '',
                  name: '',
                  password: '',
                  department: '',
                  team: '',
                  role: 'USER'
                })
            }
        } 
    }catch(err){
        console.error(err.message)
    }
  };

  return (
    <div className="max-w-md mx-auto h-[calc(100%-2rem)] mt-4 overflow-scroll hide-scrollbar p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4 ">Add Employee</h1>
      <div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={employee.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={employee.department}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="team">Team:</label>
          <input
            type="text"
            id="team"
            name="team"
            value={employee.team}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={employee.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          onClick={()=>handleSubmit()}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EmployeeRegister;

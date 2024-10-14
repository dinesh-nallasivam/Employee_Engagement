import React, { useState } from 'react';
import Axios from "axios";

const EmployeeRegister = () => {
    const [employee, setEmployee] = useState({
        email: '',
        name: '',
        password: '',
        department: '',
        team: '',
        role: 'USER',
        image: null,
    });

    const itDepartments = [
        "Software Development",
        "Quality Assurance (QA)",
        "Project Management",
        "Product Management",
        "User Experience (UX) Design",
        "User Interface (UI) Design",
        "Systems Administration",
        "Network Engineering",
        "Database Administration",
        "Technical Support",
        "DevOps",
        "Cybersecurity",
        "Data Science",
        "Business Analysis",
        "Information Technology (IT) Support",
        "Cloud Computing",
        "Infrastructure Management",
        "Research and Development (R&D)",
        "Training and Development",
    ];

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setEmployee({
                ...employee,
                image: files[0],
            });
        } else {
            setEmployee({
                ...employee,
                [name]: value,
            });
        }
    };

    const handleSubmit = async () => {
      try {
          if (employee.email && employee.name && employee.password && employee.department && employee.team && employee.image) {
              const formData = new FormData();
              formData.append('image', employee.image);
              Object.keys(employee).forEach(key => {
                  if (key !== 'image') {
                      formData.append(key, employee[key]);
                  }
              });
  
              const res = await Axios.post("http://localhost:3000/admin/employee", formData, {
                  withCredentials: true,
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
  
              if (res.status === 201) {
                  setEmployee({
                      email: '',
                      name: '',
                      password: '',
                      department: '',
                      team: '',
                      role: 'USER',
                      image: null,
                  });
              }
          }
      } catch (err) {
          console.error(err.message);
      }
  };
  

    return (
        <div className="max-w-md mx-auto mt-10 overflow-scroll hide-scrollbar p-4 border rounded-lg shadow-md bg-white">
            <h1 className="text-xl font-bold mb-4">Add Employee</h1>
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
                    <select
                        id="department"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                    >
                        {
                            itDepartments.map((element, index) => (
                                <option value={element} key={index}>{element}</option>
                            ))
                        }
                    </select>
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

                {/* Image Upload Field */}
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default EmployeeRegister;

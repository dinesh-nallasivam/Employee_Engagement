import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from "./pages/Login"
import EmployeeIndex from './pages/Employee/Index';
import AdminIndex from './pages/Admin/Index';
import Quiz from './components/PopUps/Quiz';

function App() {

  const [popUps,setPopUps] = useState({})

  return (
    <div className='h-screen w-full relative'>
      <div className={`h-screen overflow-hidden ${Object.keys(popUps).length!=0 && "opacity-30 pointer-events-none"}`}>
          <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login"/>} />
                <Route path="/employee/*" element={<EmployeeIndex setPopUps={setPopUps}/>} />
                <Route path="/admin/*" element={<AdminIndex setPopUps={setPopUps}/>} />
            </Routes>
          </Router>
      </div>

      {
        Object.keys(popUps).length!=0 && (
          <div className='absolute top-0 left-0 w-full h-screen overflow-hidden'>
              {
                (popUps.name === "Add new quiz") && (
                  <Quiz 
                    popUps={popUps}
                    setPopUps={setPopUps}
                  />
                )
              }
              
          </div>
        )
      }
    </div>
  )
}

export default App

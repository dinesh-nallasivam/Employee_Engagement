import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Dashboard from './Dashboard.jsx';
import Sidebar from '../../components/Navbar/AdminSidebar.jsx';
import Courses from '../Admin/Courses.jsx';
import EmployeeRegister from './EmployeeRegister.jsx';

function Index({setPopUps}) {
    return (
        <>
            <div className='w-full h-full'>
                <Navbar/>
                <div className='flex w-full h-[calc(100%-56px)] overflow-hideen'>
                    <div className='w-fit h-full shadow-sidebarshadow'>
                        <Sidebar/>
                    </div>
                    <div className='basis-11/12 md:basis-none md:w-full overflow-y-scroll'>
                        <div className='h-full w-full'>
                            <Routes>
                                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                                <Route path="/courses" element={<Courses setPopUps={setPopUps}/>} />
                                <Route path="/register" element={<EmployeeRegister />} />
                            </Routes>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Index;
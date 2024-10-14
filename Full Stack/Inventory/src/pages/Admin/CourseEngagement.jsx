import { useEffect, useState } from "react";
import PathDisplay from "../../components/Navbar/PathDisplay";
import Axios from "axios";
import { Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function CourseEngagement({ pathList, handleNavigation }) {
    const [avgMetrics, setAvgMetrics] = useState({});
    const [statusCount, setStatusCount] = useState([]);
    const [topEmploy, setTopEmploy] = useState([]);
    const [completionData, setCompletionData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
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

    const generateMonths = () => {
        const months = [];
        for (let i = 0; i < 12; i++) {
            const month = new Date(new Date().setMonth(i)).toLocaleString('default', { month: 'long' });
            months.push(month);
        }
        return months;
    };

    const allMonths = generateMonths();

    const lineChartData = {
        labels: allMonths,
        datasets: [
            {
                label: 'Average Completion Rate',
                data: allMonths.map(month => {
                    const monthData = completionData.find(item => item.month === month);
                    return monthData ? monthData.averageRate : 0;
                }),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const pieChartData = {
        labels: ['Enrolled', 'In Progress', 'Completed'],
        datasets: [
            {
                data: statusCount,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 20,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    padding: 10,
                },
            },
        },
        layout: {
            padding: {
                bottom: 20,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    
    

    useEffect(() => {
        const fetch = async () => {
            try {
                let par = {}

                if (selectedDepartment) {
                    par.departmentId = selectedDepartment
                }

                const res1 = await Axios.get("http://localhost:3000/admin/avgMetrics", {
                    params: par,
                    withCredentials: true
                });
                if (res1.status === 200) {
                    const data = res1.data.data;
                    setAvgMetrics({ ...data });
                }

                const res4 = await Axios.get("http://localhost:3000/admin/statusCount", {
                    params: par,
                    withCredentials: true
                });
                if (res4.status === 200) {
                    const data = res4.data.data;
                    setStatusCount([
                        data.enrolledCount,
                        data.inProgressCount,
                        data.completedCount
                    ]);
                }

                const res2 = await Axios.get("http://localhost:3000/admin/monthReport", {
                    params: par,
                    withCredentials: true
                });
                if (res2.status === 200) {
                    const data = res2.data.data;
                    setCompletionData([...data]);
                }

                const res3 = await Axios.get("http://localhost:3000/admin/topEmployee", {
                    params: par,
                    withCredentials: true
                });
                if (res3.status === 200) {
                    const data = res3.data.data;
                    setTopEmploy([...data]);

                    setDepartments([...itDepartments]);
                }
            } catch (err) {
                console.error(err.message);
            }
        }

        fetch();
    }, [selectedDepartment]);

    const filteredEmployees = selectedDepartment
        ? topEmploy.filter(employee => employee.department === selectedDepartment)
        : topEmploy;

    return (
        <div className="h-full w-full p-4 space-y-6">
            <PathDisplay
                pathList={pathList}
                handleNavigation={handleNavigation}
            />

            <div className="flex justify-end items-center">
                <label htmlFor="departmentFilter" className="mr-2">Filter by Department:</label>
                <select
                    id="departmentFilter"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="border rounded-md p-2"
                >
                    <option value="">All Departments</option>
                    {departments.map(department => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(avgMetrics).map(([key, value]) => (
                    <div key={key} className="border rounded-md p-4 shadow-md bg-white">
                        <p className="font-semibold capitalize">{key.replace('avg', 'Average ')}</p>
                        <p>{value.toFixed(2)}%</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-2">
                    <div className="rounded-md border shadow-md h-96 w-full">
                        <h3 className="text-lg font-bold py-2 border-b text-center">Average Completion Rate Over the Month</h3>   
                        <div className="px-3 py-2 pb-4 h-full">
                            <Line data={lineChartData} options={lineChartOptions} />
                        </div>
                    </div>
                </div>

                <div className="p-2">
                    <div className="rounded-md border shadow-md h-96 w-full flex flex-col">
                        <h3 className="text-lg font-bold py-2 border-b text-center">Course Enrollment Status</h3>
                        <div className="px-3 py-4 pb-4 h-full">
                            <Pie data={pieChartData} options={pieChartOptions} />
                        </div>
                    </div>
                </div>

                <div className="p-2">
                    <div className="w-full border h-96 w-full rounded-md shadow-md">
                        <h3 className="text-lg font-bold py-2  border-b text-center">Top 5 Scored Employees</h3>
                        <div className=" px-2 py-2 pb-4 h-full overflow-hidden">
                            <table className="w-full bg-white rounded-md border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 p-2">Name</th>
                                        <th className="border border-gray-300 p-2">Department</th>
                                        <th className="border border-gray-300 p-2">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees.slice(0, 5).map(employee => (
                                        <tr key={employee.id}>
                                            <td className="border border-gray-300 p-2 text-center">{employee.name}</td>
                                            <td className="border border-gray-300 p-2 text-center">{employee.department}</td>
                                            <td className="border border-gray-300 p-2 text-center">{employee.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseEngagement;

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Doughtnut() {
        
    const chartData = {
        labels: ['Completed', 'In Progress', 'Enrolled'],
        datasets: [
            {
                data: [12, 5, 3],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    }

    return (
        <div className="shadow-lg rounded-lg p-4 border">
            <h2 className="text-2xl font-semibold mb-4 text-center">Course Progress</h2>
            <div className="h-64 w-full">
                <Doughnut data={chartData} options={chartOptions} style={{ height: "100%", width: "100%" }}/>
            </div>
        </div>
    );
}

export default Doughtnut;
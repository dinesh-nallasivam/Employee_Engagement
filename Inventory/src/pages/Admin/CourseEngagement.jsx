import BarChart from "../../components/DashBoard/BarChart";
import PathDisplay from "../../components/Navbar/PathDisplay";

function CourseEngagement({pathList,handleNavigation}) {
    return (
        <div className="h-full w-full">
            <PathDisplay
                pathList={pathList}
                handleNavigation={handleNavigation}
            />

            <div className="p-4">
                <BarChart/>
            </div>
        </div>
    );
}

export default CourseEngagement;
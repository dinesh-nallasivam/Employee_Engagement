import { TiTickOutline } from "react-icons/ti";

function ChapterSideBar({element}) {
    return (
        <div className="px-2">
            <div className="flex items-center gap-2">
                <p className="text-base font-medium border-0.5 w-9 h-9 rounded-full flex justify-center items-center">
                    1
                </p>
                <p className="border-0.5 w-9 h-9 rounded-full flex justify-center items-center overflow-hidden">
                    <TiTickOutline className="w-full h-full bg-green text-white" />
                </p>
                <p className="text-base font-medium">
                    Chater
                </p>
            </div>
        </div>
     );
}

export default ChapterSideBar;
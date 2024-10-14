import { useState } from "react";
import { CiSearch } from "react-icons/ci";

function search({search,setSearch,handleClick}) {

    return (
        <div className="flex gap-4 w-full  justify-center">
            <div className="border w-[75%] p-1 pl-4 h-10 rounded-lg flex items-center">
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    value={search}
                    className="focus:outline-0 w-full"
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </div>
            <div
                onClick={handleClick} 
                className="border hover:bg-zinc-300 w-10 p-1 rounded-lg flex justify-center items-center">
                <CiSearch className=" w-full h-full p-1 "/>
            </div>              
        </div>
    );
}

export default search;
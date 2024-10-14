function SubNavbar({element,check,handleSubNavigation}) {
    return (
        <div className="flex flex-col min-w-fit pt-4 cursor-pointer" onClick={()=>handleSubNavigation(element)}>
            <p 
                className={`
                    font-normal text-md px-3 text-nowrap
                    ${!check? "text-slate-500":"text-primarycolor"} 
                `}>
                {element}
            </p>
            {
                check && (
                    <p className="border-2 border-blue rounded-t rounded-t-5 border-primarycolor"></p>
                )
            }
        </div>
    );
}

export default SubNavbar;
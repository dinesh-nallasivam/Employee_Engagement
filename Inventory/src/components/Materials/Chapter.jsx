function Chapter() {
    return (
        <div className="p-4 w-full">
            <h1 className="text-2xl font-medium my-5">
                Chapter
            </h1>
            <div className="text-base font-normal">
                {/* <div className="mt-4">
                    <div className="p-4 mt-2">
                    <div dangerouslySetInnerHTML={{ __html: editorContent }} />
                    </div>
                </div> */}
            </div>
            <div className="my-5 p-9 flex flex-row-reverse">
                <button className="w-fit p-2 px-4 rounded-md bg-green text-white text-base font-normal">
                    Save    
                </button>               
            </div>
        </div>
    );
}

export default Chapter;
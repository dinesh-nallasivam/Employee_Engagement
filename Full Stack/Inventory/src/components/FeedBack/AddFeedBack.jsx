function AddFeedBack({feedtext,feedbackQuestion,setFeedQuestion,setFeedText,handleSubmit}) {
    return (
        <>
            <div className="w-full md:w-[75%] mx-auto flex justify-end my-4">
                <button className="px-4 p-2 rounded-md bg-green text-base font-medium" onClick={handleSubmit}>
                    Submit
                </button>
            </div> 

            <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white">
                <h1 className="text-xl font-bold mb-4">FeedBack Question</h1>
                <input
                    type="text"
                    value={feedtext}
                    onChange={(e) => setFeedText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none"
                    placeholder="Type your question here"
                />
                <button
                    onClick={()=>{setFeedQuestion(prev=>[...prev,feedtext]);setFeedText('');}}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Question
                </button>
                <h2 className="text-lg font-semibold mt-4">Questions List</h2>
                    <ul className="list-disc pl-5 mt-2">
                        {feedbackQuestion.map((q, index) => (
                            <li key={index} className="mb-1">{q}</li>
                        ))}
                    </ul>
                </div>
        </>
    );
}

export default AddFeedBack;
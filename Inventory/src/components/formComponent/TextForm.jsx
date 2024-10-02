function TextForm({name,text,setText}) {
    return (
        <div className="my-3">
            <label htmlFor={name} className="block text-base font-medium mb-2">
                {name}
            </label>
            <div className="w-full mb-4 pl-4 p-2 border border-gray-300 rounded bg-white">
                <input
                    type="text"
                    id={name}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full text-ssm font-normal focus:outline-none bg-white"
                />     
            </div>
        </div>
    );
}

export default TextForm;

function DropdownForm({ name, options, selectedOption, setSelectedOption }) {
    return (
        <div className="my-3">
            <label htmlFor={name} className="block text-xs font-medium mb-2">
                {name}
            </label>
            <div className="w-full border flex rounded overflow-hidden p-1 pl-2">
                <select
                    id={name}
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full text-ssm font-normal focus:outline-none"
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default DropdownForm;
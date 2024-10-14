import { useState } from "react"

function DropDown({options,name,selectedOption,setSelectedOption}) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    // const [selectedOption, setSelectedOption] = useState(null)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleSelect = (option) => {
        setSelectedOption(option)
        setIsOpen(false)
    }

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="my-3">
            <label htmlFor={name} className="block text-xs font-medium mb-2">
                {name}
            </label>
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="w-full px-4 py-2 bg-gray-300 border rounded-md flex justify-between items-center"
                >
                    {selectedOption || 'Select an option'}
                    <svg
                        className="w-5 h-5 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-10 h-42 mt-2 w-full bg-white border rounded-md shadow-lg">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border-b rounded-t-md"
                        />
                        <ul className="max-h-60 overflow-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSelect(option)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {option}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-gray-500">No options found</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropDown
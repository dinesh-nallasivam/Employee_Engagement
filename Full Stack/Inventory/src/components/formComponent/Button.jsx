function Button({name,handle}) {
    return (
        <button
        onClick={handle}
        className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
            {name}
        </button>
    );
}

export default Button;
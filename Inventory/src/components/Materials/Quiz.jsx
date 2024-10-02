import { useState, useEffect } from "react";

function Quiz() {
    const [questions, setQuestions] = useState([
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid']
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Jupiter', 'Saturn']
        },
        {
            question: 'What is the largest mammal?',
            options: ['Elephant', 'Blue Whale', 'Shark', 'Giraffe']
        },
    ]);

    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [timer, setTimer] = useState(210);
    const [quizFinished, setQuizFinished] = useState(false);

    const handleOptionClick = (index, option) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answerChoosed = option;
        setQuestions(updatedQuestions);
    };

    const handleStartQuiz = () => {
        setIsQuizStarted(true);
        setTimer(210);
    };

    const handleSubmit = () => {
        setQuizFinished(true);
        setIsQuizStarted(false);
    };

    useEffect(() => {
        if (isQuizStarted && timer > 0) {
            const countdown = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (timer === 0) {
            handleSubmit();
        }
    }, [isQuizStarted, timer]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="max-w-xl h-[calc(100%-2rem)] mx-auto my-5 p-6 bg-white shadow-md rounded-lg overflow-hidden relative">
            {quizFinished ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Quiz Finished!</h2>
                    <p className="text-gray-600 mt-2">Your score: {/* Score logic here */} out of {questions.length}</p>
                </div>
            ) : !isQuizStarted ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome to the Quiz!</h2>
                    <button
                        className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                        onClick={handleStartQuiz}
                    >
                        Start Quiz
                    </button>
                </div>
            ) : (
                <div className="h-full hide-scrollbar overflow-y-scroll">
                    <div className="flex flex-row-reverse text-lg font-semibold p-4">
                        Time Left: {formatTime(timer)}
                    </div>
                    {questions.map((element, indx) => (
                        <div className="mb-8" key={indx}>
                            <h1 className="text-xl font-semibold text-gray-800 mb-4">
                                {element.question}
                            </h1>

                            <div className="grid grid-cols-1 gap-3">
                                {element.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`w-full py-2 px-4 border rounded-lg text-left transition duration-300 ${
                                            option === element.answerChoosed
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                        }`}
                                        onClick={() => handleOptionClick(indx, option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default Quiz;

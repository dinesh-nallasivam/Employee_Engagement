import { useState, useEffect } from "react"
import Axios from "axios"


function Quiz({quizDetails,handleIndex}) {
    const [questions, setQuestions] = useState([])
    const [isQuizStarted, setIsQuizStarted] = useState(false)
    const [timer, setTimer] = useState(120)
    const [quizFinished, setQuizFinished] = useState(false)

    useEffect(()=>{
        setQuestions([...quizDetails.questions])
       
        setTimer((quizDetails.questions.length) * 25)
        if(quizDetails.isComplete){
            setQuizFinished(true)
        }else{
            setQuizFinished(false)
        }
    },[])

    const handleOptionClick = (index, optionIndex) => {
        const updatedQuestions = [...questions]
        updatedQuestions[index].answerChoosed = optionIndex
        setQuestions(updatedQuestions)
    }

    const handleStartQuiz = () => {
        setIsQuizStarted(true)
    }

    const handleSubmit = () => {
        const quizResult  = async()=>{
            try{
                const data = quizDetails
                data.questions = questions
                
                const res = await Axios.post("http://localhost:3000/employee/quiz",{
                    data
                },{
                    withCredentials:true,
                })

                if(res.status == 201){
                    handleIndex(quizDetails.index+1)
                    setQuizFinished(true)
                    setIsQuizStarted(false)
                }

            }catch(err){
                console.log(err.message)
            }
        }
        quizResult()
    }

    useEffect(() => {
        if (isQuizStarted && timer > 0) {
            const countdown = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(countdown)
        } else if (timer === 0) {
            handleSubmit()
        }
    }, [isQuizStarted, timer])

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    return (
        <div className="max-w-xl h-[calc(100%-2rem)] mx-auto my-5 p-6 bg-white shadow-md rounded-lg overflow-hidden relative">
            {quizFinished ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Quiz Finished!</h2>
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
                    {questions.length!=0 && questions.map((element, indx) => (
                        <div className="mb-8" key={indx}>
                            <div className="flex justify-between items-center">
                                <h1 className="text-xl font-semibold text-gray-800 mb-4">
                                    {indx+1}. {element.question}
                                </h1>
                                <p className="text-sm font-medium">
                                    Mark : <span className="font-bold">{element.mark}</span>
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {element.options.length!=0 && element.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`w-full py-2 px-4 border rounded-lg text-left transition duration-300 ${
                                            index === element.answerChoosed
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                        }`}
                                        onClick={() => handleOptionClick(indx, index)}
                                    >
                                        {option.text}
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
    )
}

export default Quiz

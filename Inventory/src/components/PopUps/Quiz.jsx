import { useState } from "react";
import { IoMdClose } from "react-icons/io"
import TextFrom from "../formComponent/TextForm"

function Quiz({popUps,setPopUps}) {

    const [ques,setQuestion] = useState("")
    const [option1,setOption1] = useState("")
    const [option2,setOption2] = useState("")
    const [option3,setOption3] = useState("")
    const [option4,setOption4] = useState("")

    const handleAdd = ()=>{
        if(ques && option1 && option2 && option3 && option4){
            console.log(popUps.handleQuiz)
            const operation = popUps.handleQuiz
            operation(prev=>[...prev,{
                question:ques,
                options:[option1,option2,option3,option4]
            }])
            setPopUps({})
        }   
    }

    
    return (
        <div className="w-[70%] sm:w-[50%] h-[70%]  mt-[10%] mx-auto border rounded-md bg-white overflow-auto flex flex-col justify-between hide-scrollbar shadow-xl"
        >
            <div className="w-full p-3.5 flex justify-between items-center border-b border-primaryborder">
                <p className="pl-5 text-base font-medium text-black-800">
                    Question Details
                </p>
                <IoMdClose className="cursor-pointer w-8 h-8" onClick={()=>setPopUps({})}/>
            </div>
            <div className="w-full py-3.5 px-10">
                <TextFrom
                    name="Enter the question"
                    text={ques}
                    setText={setQuestion}
                />
                <TextFrom
                    name="Enter the option 1"
                    text={option1}
                    setText={setOption1}
                />
                <TextFrom
                    name="Enter the option 2"
                    text={option2}
                    setText={setOption2}
                />
                <TextFrom
                    name="Enter the option 3"
                    text={option3}
                    setText={setOption3}
                />
                <TextFrom
                    name="Enter the option 4"
                    text={option4}
                    setText={setOption4}
                />
            </div>
            <div className="p-2.5 flex justify-end  items-end gap-x-4 border-t border-primaryborder">
                <button className="border border-finance-popupbutton rounded px-3.5 py-1.5 text-xxs font-medium text-finance-popupbuttoncontent uppercase" onClick={()=>setPopUps({})}>
                    cancel
                </button>
                <button className="border-0.5 border-primarycolor rounded px-2.5 py-1.5 text-xxs font-medium text-white bg-primarycolor uppercase" onClick={()=>handleAdd()}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default Quiz;
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import TextFrom from "../formComponent/TextForm";

function Quiz({ popUps, setPopUps }) {
  const [ques, setQuestion] = useState("");
  const [option1, setOption1] = useState({ text: "", isCorrect: false });
  const [option2, setOption2] = useState({ text: "", isCorrect: false });
  const [option3, setOption3] = useState({ text: "", isCorrect: false });
  const [option4, setOption4] = useState({ text: "", isCorrect: false });

  const handleAdd = () => {
    if (ques && option1.text && option2.text && option3.text && option4.text) {
      const operation = popUps.handleQuiz;
        console.log(ques,option1,option2,option3,option4)
        operation((prev) => [
        ...prev,
        {
          question: ques,
          options: [{...option1}, {...option2},{...option3},{...option4}],
        },
      ]);
      setPopUps({});
    }
  };

  const handleOptionChange = (optionSetter, text, isCorrect) => {
    optionSetter({ text, isCorrect });
  };

  const opt = (index,text,setOption,isCorrect)=>{
    return(
        <>
            <TextFrom name={`Enter the option ${index}`} text={text} setText={(text) => handleOptionChange(setOption, text, isCorrect)} />
            <label className="flex gap-3 items-center">
            Is Correct:
            <input type="checkbox" checked={isCorrect} onChange={() => handleOptionChange(setOption, text, !isCorrect)} />
            </label> 
        </>
    )
  }

  return (
    <div className="w-[70%] sm:w-[50%] h-[70%] mt-[10%] mx-auto border rounded-md bg-white overflow-auto flex flex-col justify-between hide-scrollbar shadow-xl">
      <div className="w-full p-3.5 flex justify-between items-center border-b border-primaryborder">
        <p className="pl-5 text-base font-medium text-black-800">Question Details</p>
        <IoMdClose className="cursor-pointer w-8 h-8" onClick={() => setPopUps({})} />
      </div>
      <div className="w-full py-3.5 px-10">
        <TextFrom 
            name="Enter the question" 
            text={ques} 
            setText={setQuestion} 
        />
            
        {
            opt(1,option1.text,setOption1, option1.isCorrect)
        }
       
        {
            opt(2,option2.text,setOption2, option2.isCorrect)
        }

        {
            opt(3,option3.text,setOption3, option3.isCorrect)
        }

        {
            opt(4,option4.text,setOption4, option4.isCorrect)
        }
        {/* {
            opt(2,option2.text,(text) => handleOptionChange(setOption2, text, option2.isCorrect))
        }

        {
            opt(3,option3.text,(text) => handleOptionChange(setOption3, text, option3.isCorrect))
        }

        {
            opt(4,option4.text,(text) => handleOptionChange(setOption4, text, option4.isCorrect))
        } */}
        
      </div>
      <div className="p-2.5 flex justify-end items-end gap-x-4 border-t border-primaryborder">
        <button className="border border-finance-popupbutton rounded px-3.5 py-1.5 text-xxs font-medium text-finance-popupbuttoncontent uppercase" onClick={() => setPopUps({})}>
          Cancel
        </button>
        <button className="border-0.5 border-primarycolor rounded px-2.5 py-1.5 text-xxs font-medium text-white bg-primarycolor uppercase" onClick={() => handleAdd()}>
          Add
        </button>
      </div>
    </div>
  );
}

export default Quiz;

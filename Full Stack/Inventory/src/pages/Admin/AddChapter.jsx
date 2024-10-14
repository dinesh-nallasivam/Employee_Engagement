import { IoReturnUpBack } from "react-icons/io5"
import TextForm from "../../components/formComponent/TextForm";
import { useState } from "react";
import Add from "../../components/formComponent/Add";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddChapter({setNewCheck,setPopUps,setChapter}) {
    
    const [editorContent, setEditorContent] = useState('');
    const [chapterName,setChapterName] = useState('')
    const [quiz,setQuiz] =  useState([])
    const [quizName,setQuizName] =  useState("")

    const handleChange = (value) => {
      setEditorContent(value);
    };
    
    const handleSubmit = ()=>{
        if(chapterName && editorContent ){
            setChapter(prev=>[...prev,
                {
                    chapterName:chapterName,
                    content:editorContent,
                    quizName: quizName,
                    quiz:[...quiz]
                }
            ])
            setNewCheck(false)
        }
    }

    return (
        <div className="w-full h-full">
            
            <div className="p-2 px-5 flex justify-between">
                <IoReturnUpBack
                    className="w-6 h-8 cursor-pointer"
                    onClick={()=>setNewCheck(false)}
                />
                <button 
                    onClick={handleSubmit}
                    className="p-2 px-4 mr-5 sm:mr-10 text-base font-medium bg-green text-white rounded-md">
                    Submit
                </button>
            </div>

            <div className="px-5 my-2">
                <p className="text-lg font-bold">
                    Chapter Details  
                </p>
                <TextForm
                    name="Enter The Chapter Name"
                    text={chapterName}
                    setText={setChapterName}
                />
            </div>

            <div className="p-5 w-full ">
                <h1 className="text-2xl font-bold mb-4">Content of the Chapter</h1>
                <ReactQuill
                    value={editorContent}
                    onChange={handleChange}
                    placeholder="Start typing..."
                    className="bg-white border rounded-lg shadow-md h-16 md:h-40 overflow-y-auto hide-scrollbar"
                />
            </div>

            <div className="px-5 my-2">
                <div className="flex my-6 justify-between">
                    <p className="text-lg font-bold">
                        Chapter Quiz Details  
                    </p>
                    <Add
                        name="Add Quiz"
                        handleClick={()=>setPopUps({name:"Add new quiz",handleQuiz:setQuiz})}
                    />
                </div>
                <div className="w-full py-4">
                    <TextForm
                        name="Enter The Quiz Name"
                        text={quizName}
                        setText={setQuizName}
                    />
                </div>
                {
                    Object.keys(quiz).length!=0 && quiz.map((element,index)=>(
                        <div className="my-4" key={index}>
                            <p className="text-base font-medium">
                                {index+1}. {element.question}
                            </p>
                            <div className="my-2">
                                {
                                    element.options.map((op,indx)=>(
                                        <p
                                         key={indx}
                                         className="pl-4 py-1 text-base font-normal">
                                        {op.text} 
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AddChapter;
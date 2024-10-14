import { useState } from "react";
import PathDisplay from "../../components/Navbar/PathDisplay";
import TextForm from "../../components/formComponent/TextForm";
import Textarea from "../../components/formComponent/Textarea";
import Button from "../../components/formComponent/Button";
import Add from "../../components/formComponent/Add"
import AddChapter from "./AddChapter";
import AddFeedBack from "../../components/FeedBack/AddFeedBack";
import Axios from "axios"

function AddCourse({pathList,handleNavigation,setPopUps}) {
    const [newCheck, setNewCheck] = useState(false);
    const [feedtext, setFeedText] = useState('');
    const [section, setSection] = useState(0);
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('');
    const [chapter, setChapter] = useState([]);
    const [feedbackQuestion, setFeedQuestion] = useState([]);
    const [imageFile, setImageFile] = useState(null); // Image state

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0]); // Set the selected file
    };

    const handleSubmit = async () => {
        try {
            if (header && description && feedbackQuestion.length !== 0 && chapter.length !== 0 && imageFile) {
                const formData = new FormData();
                formData.append('courseName', header);
                formData.append('description', description);
                formData.append('chapters', JSON.stringify(chapter));
                formData.append('feedbackQuestion', JSON.stringify(feedbackQuestion));
                formData.append('image', imageFile); // Append image file

                const res = await Axios.post("http://localhost:3000/admin/addCourse", formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (res.status === 200) {
                    setFeedText('');
                    setHeader('');
                    setDescription('');
                    setChapter([]);
                    setFeedQuestion([]);
                    setImageFile(null); // Reset image file
                    handleNavigation(pathList[0]);
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };


    return (
        <div className="h-full w-full">
            <PathDisplay
                pathList={pathList}
                handleNavigation={handleNavigation}
            />

            <div className="bg-slate-100 h-[calc(100%-3rem)] overflow-hidden">
                <div className="h-full w-full overflow-y-scroll hide-scrollbar">
                {
                    newCheck && (
                        <AddChapter
                            setPopUps={setPopUps}
                            setNewCheck={setNewCheck}
                            setChapter={setChapter}
                        />
                    )
                }

                {
                    section==0 && !newCheck && (
                        <div className="flex flex-col items-center justify-center h-full p-6">
                            <div className="max-w-xl bg-white shadow-lg rounded-lg p-6">
                                <h1 className="text-3xl font-bold mb-4">Enter Course Details</h1>
                                <TextForm
                                    name="Course Title"
                                    text={header}
                                    setText={setHeader}
                                />
                                <Textarea
                                    name="Course Description"
                                    text={description}
                                    setText={setDescription}
                                />
                                <div className="my-2">
                                    <label className="block text-lg font-medium mb-2">Upload Course Image</label>
                                    <input
                                        type="file"
                                        accept="*"
                                        onChange={handleImageUpload}
                                        className="border border-gray-300 p-2 w-full"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        name="Next Page"
                                        handle={()=>setSection(1)}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    section==1 && !newCheck && (
                    <div className="w-full h-full">
                        <div className="flex gap-2 pr-4 md:pr-10 py-4 justify-end">
                            <Add
                                name="Add Chapter"
                                handleClick={()=>setNewCheck(true)}
                            />
                        </div>
                        <div className="p-2 py-4">
                            <div className="my-6 w-[97%] sm:w-[75%] mx-auto">
                            {
                                chapter.map((element,index)=>(
                                    <div 
                                        className={`cursor-pointer border-b border-slate-300 ${index%2==0? "rounded-bl-3xl rounded-tr-3xl bg-slate-200":""}`}>
                                        <p className="p-1 pl-6 text-lg font-medium">
                                            {index+1}. {element.chapterName}
                                        </p>
                                        {
                                            element.quiz?.length!=0 && (
                                                <p className="pl-10 text-base font-medium">
                                                    Quiz uestion Count : {element.quiz.length}
                                                </p>
                                            ) 
                                        }
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        <div className="my-3 flex justify-end gap-3 px-5">
                            <Button
                                name="Previous Page"
                                handle={()=>setSection(0)}
                            />
                            <Button
                                name="Next Page"
                                handle={()=>setSection(2)}
                            />
                        </div>
                    </div>
                    )
                }

                {
                    section == 2 && !newCheck && (
                        <AddFeedBack
                            feedbackQuestion={feedbackQuestion}
                            feedtext={feedtext}
                            setFeedText={setFeedText}
                            setFeedQuestion={setFeedQuestion}
                            handleSubmit={handleSubmit}
                        />
                    )
                }
                </div>
            </div>
        </div>
    );
}

export default AddCourse;
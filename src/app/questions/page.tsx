'use client'
import { useEffect, useState } from "react";
import { gkQuestions } from "../../../gk";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Question } from "../questions-upload/page";




const QuestionsTable: React.FC = () => {
    const [gkQuestion, setGkQuestion] = useState<any>(gkQuestions);
    useEffect(()=>{
//check gaurd
let user = window.localStorage.getItem('user');
    let email = window.localStorage.getItem('isLoggedIn');
    let loggedInUser = JSON.parse(user || '{}');

    if(loggedInUser?.isAdmin === true && email ===loggedInUser?.email){
       console.log("You are authorized to view this page") 
    }
    else {
        window.location.href = '/login';
        toast.error('You are not authorized to view this page');

    }


     const ques =window.localStorage.getItem('questions') 
     if(ques){
       let JsonQuestions = JSON.parse(ques)
       JsonQuestions.reverse()
       JsonQuestions = [...JsonQuestions,...gkQuestions]
       
       setGkQuestion(JsonQuestions);
     }


     

   },[])

   useEffect(()=>{
    
},[])

   const handleDelete=(question:string)=>{
    const updatedQuestions = gkQuestion.filter((q:any) => q.question !== question);
    setGkQuestion(updatedQuestions)
    Swal.fire({
        text:"Your Question is deleted!",
        icon:"success"
    })
   }
   const [isOpen, setIsOpen] = useState(false);
   const [questionInfo,setQuestionInfo] = useState<Question>({
    question: "",

      a: "",
      b: "",
      c: "",
      d: "",
    
    answer: "",
});
const [prev,setPrev]=useState("")

   const toggleModal = (q:any) => {
     setIsOpen(!isOpen);
     setPrev(q?.question)
     setQuestionInfo({
        question:q?.question,
        a:q?.options?.a,
        b:q?.options?.b,
        c:q?.options?.c,
        d:q?.options?.d,
        answer:q.answer

     })
   };
   
   const handleSubmit = () => {
   

     const preQuestions = window.localStorage.getItem('questions');
       const  questions= preQuestions ? JSON.parse(preQuestions) : [];

      const newQuestion = questions.filter((q:any)=>q.question!==prev)
      newQuestion.push({
          question: questionInfo.question,
          options:{
              a: questionInfo.a,
              b: questionInfo.b,
              c: questionInfo.c,
              d: questionInfo.d,
          },
          answer: questionInfo.answer,
      });

      
      
     window.localStorage.setItem('questions', JSON.stringify(newQuestion));
  Swal.fire({
      title: "Success!",
      text: "Question Updated successfully",
      icon: "success",
      })
  
   
  };

  const handleChange = (e:any) => {
      e.preventDefault();
      setQuestionInfo((prev)=>{
        return{
          ...prev,
         [e.target.name]: e.target.value
        }
      })
    };
 
    return (


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">





 
 

    

      {/* Main modal */}
      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update Questions
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          {/* <h2 className="mb-4 text-xl font-bold text-white">Upload A Question</h2> */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="question"
                  className="block mb-2 text-sm font-medium text-white"
                >
              Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={questionInfo?.question}
                  onChange={handleChange}
                  id="question"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="Type questions"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="a"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Option A
                </label>
                <input
                  type="text"
                  name="a"
                  id="a"
                  value={questionInfo?.a}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="Option A"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="b"
                  className="block mb-2 text-sm font-medium text-white"
                >
                    Option B
                </label>
                <input
                  type="text"
                  name="b"
                  id="b"
                  value={questionInfo?.b}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="Option B"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="b"
                  className="block mb-2 text-sm font-medium text-white"
                >
                    Option C
                </label>
                <input
                  type="text"
                  name="c"
                  id="c"
                 value={questionInfo?.c}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="Option C"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="d"
                  className="block mb-2 text-sm font-medium text-white"
                >
                    Option D
                </label>
                <input
                  type="text"
                  name="d"
                  id="d"
                  value={questionInfo?.d}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="Option D"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="answer"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Answer
                </label>
                <select
                  id="category"
                  onChange={handleChange
                

                  }
                  defaultValue={questionInfo?.answer}
                      name="answer"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option>Select Options</option>
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </select>
              </div>

             
            </div>
            <button
              type="submit"
             
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 ring-2 focus:ring-primary-200 hover:bg-primary-800"
            >
              Edit 
            </button>
          </form>
        </div>
            </div>
          </div>
        </div>
      )}
    

            <table className="w-11/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Question</th>
                        <th scope="col" className="px-6 py-3">Option A</th>
                        <th scope="col" className="px-6 py-3">Option B</th>
                        <th scope="col" className="px-6 py-3">Option C</th>
                        <th scope="col" className="px-6 py-3">Option D</th>
                        <th scope="col" className="px-6 py-3 ">Answer</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Delete</span></th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {gkQuestion.map((q:any, index:number) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {  q?.question}
                            </th>
                            <td className="px-6 py-4">{q?.options?.a}</td>
                            <td className="px-6 py-4">{q?.options?.b}</td>
                            <td className="px-6 py-4">{q?.options?.c}</td>
                            <td className="px-6 py-4">{q?.options?.d}</td>
                            <td className="px-6 py-4 ">{q?.answer.toUpperCase()}</td>
                             <td className="px-6 py-4 text-right" >
                             <button onClick={()=>toggleModal(q)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>


                             </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={()=>handleDelete(q?.question)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                            </td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuestionsTable;

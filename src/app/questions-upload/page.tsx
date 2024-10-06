'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
interface Question {
    question: string;
    
      a: string;
      b: string;
      c: string;
      d: string;
   
    answer: string;
  }
export default function QuestionsUpload() {
    useEffect(()=>{
        let user = window.localStorage.getItem('user');
        let email = window.localStorage.getItem('email');
        let loggedInUser = JSON.parse(user || '{}');

        if(loggedInUser?.isAdmin === true && email ===loggedInUser?.email){
           console.log("You are authorized to view this page") 
        }
        else {
            window.location.href = '/login';
            toast.error('You are not authorized to view this page');

        }
    },[])
    const [questionInfo,setQuestionInfo] = useState<Question>({
        question: "",
    
          a: "",
          b: "",
          c: "",
          d: "",
        
        answer: "",
    });
    const handleSubmit = (e:any) => {
      e.preventDefault();
      const preQuestions = window.localStorage.getItem('questions');
        const questions = preQuestions ? JSON.parse(preQuestions) : [];
        questions.push({
            question: questionInfo.question,
            options:{
                a: questionInfo.a,
                b: questionInfo.b,
                c: questionInfo.c,
                d: questionInfo.d,
            },
            answer: questionInfo.answer,
        });
      window.localStorage.setItem('questions', JSON.stringify(questions));
    Swal.fire({
        title: "Success!",
        text: "Question uploaded successfully",
        icon: "success",
        }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/';
        }
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
      <section className="bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-white">Upload A Question</h2>
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
              Upload 
            </button>
          </form>
        </div>
      </section>
    );
  }
  
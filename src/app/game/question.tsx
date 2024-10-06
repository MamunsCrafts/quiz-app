'use client';
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";

// Define the shape of the question object
interface Question {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  answer: string;
}

interface QuestionsProps {
  mcq: Question;
  timeLeft: number;
  
}

export default function Questions({ mcq, timeLeft }: QuestionsProps) {
    const [answer, setAnswer] = useState<String>(""); 
    const {addedScore} = useAuth();

    // Function to save the ,answer both in state and in localStorage
    const givenAnswer = (ans: string) => {
        setAnswer(ans);
        // console.log("========",mcq?.options[mcq.answer as keyof typeof mcq.options],"==", ans);
        addedScore(mcq?.options[mcq.answer as keyof typeof mcq.options]===ans?10:0); 
        const email = localStorage.getItem('email');
        localStorage.setItem(`answer-${mcq.question}-${email}`, ans.toString());
    }

    // Retrieve the answer from localStorage when the component mounts or when the question changes
    useEffect(() => {
        const email = localStorage.getItem('email');
        const savedAnswer = localStorage.getItem(`answer-${mcq.question}-${email}`);
        if (savedAnswer) {
            setAnswer(savedAnswer);
        } else {
            setAnswer(""); // Reset answer if no answer is saved
        }
    }, [mcq, mcq.question]);

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="relative w-[40%] md:w-60 h-32 md:h-64 border-4 rounded-lg">
                    {/* Top Border - Green */}
                    <div className="absolute top-0 left-0 right-0 h-10 border-b-4 border-green-500 bg-gray-900 flex justify-center items-center text-white">
                        সময়: {timeLeft} সে.
                    </div>

                    {/* Left Border - Whitish */}
                    <div className="absolute top-0 left-0 bottom-0 w-10 border-r-4 border-gray-300 bg-gray-900 flex justify-center items-center"></div>

                    {/* Right Border - Red */}
                    <div className="absolute top-0 right-0 bottom-0 w-10 border-l-4"></div>

                    {/* Bottom Border - Blue */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 border-t-4 border-blue-500 text-white bg-gray-900 flex items-center justify-center">
                        সাধারণ জ্ঞান
                    </div>

                    {/* Center Content - Question Mark */}
                    <div className="flex items-center justify-center h-full animate-jump animate-infinite">
                        <span className="text-2xl md:text-7xl text-white">?</span>
                    </div>
                </div>
            </div>

            <div className="text-white flex flex-wrap justify-center text-2xl font-semibold italic pt-10">
                <span className="animate-fade-down animate-once animate-duration-1000 animate-delay-100">{mcq?.question}</span>
            </div>

            <div className="flex items-center flex-col gap-4 justify-center py-[2%]">
                {/* Green Neon Border */}
                <div onClick={() => givenAnswer(mcq.options.a)} className={`relative w-[50%] cursor-pointer h-16 mb-4 animate-fade-left ${answer === mcq.options.a ? 'bg-teal-600' : ''}`}>
                    <div className="absolute inset-0 border-4 border-green-500 rounded-lg opacity-80 flex justify-center items-center text-white text-xl">{mcq?.options?.a}</div>
                    <div className="absolute inset-0 border-4 border-green-500 rounded-lg shadow-neon-green animate-pulseGreen"></div>
                </div>

                {/* Yellow Neon Border */}
                <div onClick={() => givenAnswer(mcq.options.b)} className={`relative w-[50%] cursor-pointer h-16 mb-4 animate-fade-right ${answer === mcq.options.b ? 'bg-teal-600' : ''}`}>
                    <div className="absolute inset-0 border-4 border-yellow-500 rounded-lg opacity-80 flex justify-center items-center text-white text-xl">{mcq?.options?.b}</div>
                    <div className="absolute inset-0 border-4 border-yellow-500 rounded-lg shadow-neon-yellow animate-pulseYellow"></div>
                </div>

                {/* Blue Neon Border */}
                <div onClick={() => givenAnswer(mcq.options.c)} className={`relative w-[50%] cursor-pointer h-16 mb-4 animate-fade-left ${answer === mcq.options.c ? 'bg-teal-600' : ''}`}>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-lg opacity-80 flex justify-center items-center text-white text-xl">{mcq?.options?.c}</div>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-lg shadow-neon-blue animate-pulseBlue"></div>
                </div>

                {/* Red Neon Border */}
                <div onClick={() => givenAnswer(mcq.options.d)} className={`relative w-[50%] cursor-pointer h-16 mb-4 animate-fade-right ${answer === mcq.options.d ? 'bg-teal-600' : ""}`}>
                    <div className="absolute inset-0 border-4 border-red-500 rounded-lg opacity-80 flex justify-center items-center text-white text-xl">{mcq?.options?.d}</div>
                    <div className="absolute inset-0 border-4 border-red-500 rounded-lg shadow-neon-red animate-pulseRed"></div>
                </div>
            </div>
        </div>
    );
}

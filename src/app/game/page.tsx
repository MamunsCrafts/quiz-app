'use client';
import { useEffect, useRef, useState } from "react";
import { gkQuestions } from "../../../gk";
import Questions from "./question";
import Confetti from 'react-confetti'; // Import Confetti
import useWindowSize from 'react-use/lib/useWindowSize'
export default function Game() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMounted, setIsMounted] = useState(false); // State to track component mount status
    const [timeLeft, setTimeLeft] = useState(10); // Start with 10 seconds
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false); // State to show confetti
    const { width, height } = useWindowSize(); // Get window size for confetti

    // To play audio
    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error("Error trying to play audio:", error);
            });
        }
    };

    useEffect(() => {
        if(window.localStorage.getItem('isLoggedIn')==''){
            window.location.href='/login'
        }
        setIsMounted(true); // Set to true when the component mounts
    }, []);

    useEffect(() => {
        if (isMounted) {
            playAudio(); // Play audio when mounted
        }
        
        // Cleanup function to pause and reset audio on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; // Reset audio to start
            }
        };
    }, [isMounted]);

    // Timer logic
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval); // Stop the timer at 0 seconds
                    return 0;
                }
                return prevTime - 1; // Decrease time by 1 each second
            });
        }, 1000); // 1000 ms = 1 second

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [currentIndex]);

    const previousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < 9) {
            setCurrentIndex(currentIndex + 1);
            setTimeLeft(10); // Reset timer for the next question
            playAudio(); // Play audio for the next question
        }
    };

    const handleSubmit = () => {
        setShowConfetti(true); // Show confetti on submit
        setTimeout(() => setShowConfetti(false), 5000); // Hide after 5 seconds
    };

    return (
        <div>
            {isMounted && ( // Render audio only when mounted
                <audio autoPlay ref={audioRef}>
                    <source src="/open.mp3" type="audio/mpeg" />
                    Your Audio File
                </audio>
            )}
            {showConfetti && ( // Render Confetti
                <Confetti width={width} height={height} />
            )}
            <Questions mcq={gkQuestions[currentIndex]} timeLeft={timeLeft} />
            <div className="flex items-center justify-center">
                <button 
                    type="button" 
                    onClick={previousQuestion} 
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
                >
                    Prev
                </button>

                {currentIndex !== gkQuestions.length - 1 ? (
                    <button 
                        type="button" 
                        onClick={nextQuestion} 
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
                    >
                        Next
                    </button>
                ) : (
                    <button 
                        type="button" 
                        onClick={handleSubmit} // Call handleSubmit on click
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}

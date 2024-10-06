'use client';

import { useEffect, useState } from "react";
import SubjectCard from "./components/SubjectCard";


export default function Home() {
  const [subjects, setSubjects] = useState<any>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch('/data/questions.json');
      if (response.ok) {
        const data = await response.json();
        setSubjects(data.subjects);
        
      } else {
        console.error("Failed to fetch subjects");
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col items-center ">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 animate-fade-down animate-once animate-duration-1000 animate-delay-100 ">Welcome to the কুইজ মেলা</h1>
      <p className="text-lg text-white mb-8 animate-shake animate-once animate-duration-1000 animate-delay-100">Select a subject to get started and test your knowledge!</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-screen-lg animate-fade-up  animate-delay-100
">
        {subjects.length > 0 ? (
          subjects.map((subject:any) => (
            <SubjectCard key={subject.name} subject={subject} />
          ))
        ) : (
          <p className="text-lg text-center text-gray-500 animate-pulse">Loading subjects...</p>
        )}
      </div>
    </div>
  );
}

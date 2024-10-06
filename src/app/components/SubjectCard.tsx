'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Swal from 'sweetalert2';

// Define the interface for the subject prop
interface Subject {
  name: string;
  image: string;
  questions: { length: number }; // Assuming questions is an array of objects
}

interface SubjectCardProps {
  subject: Subject; // Use the Subject interface here
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const router = useRouter();

  const handleClick = () => {

  if(window.localStorage.getItem('isLoggedIn'))
  router.push('/game')
  else {
    Swal.fire({
      title: "Warning!",
      text: "Please login to play the game",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/login')
      }
    })
  }
  };

  

  return (
    <div
      onClick={handleClick}
      className="group relative border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
    >
      {/* Subject Image with slight zoom effect */}
      <div className="overflow-hidden">
        <Image
          src={subject.image}
          alt={`${subject.name} image`}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Gradient Background for Text */}
      <div className="p-4 bg-gradient-to-b from-white to-gray-50">
        {/* Subject Name */}
        <h2 className="text-2xl font-bold text-center text-black group-hover:text-blue-600 transition-colors duration-300">
          {subject.name}
        </h2>
        {/* Number of Questions */}
        <p className="text-center text-gray-700 text-lg mt-2">
          {subject.questions.length} Questions
        </p>
      </div>

      {/* Decoration Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default SubjectCard;

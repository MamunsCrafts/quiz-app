'use client';
import Link from 'next/link';
import {  useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { usePathname } from 'next/navigation';
const Navbar: React.FC = ({isChange}:any) => {
    const [isOpen, setIsOpen] = useState(false); // State for mobile menu
    const { isLoggedIn,login,logout,isAdmin } = useAuth();
    const pathname = usePathname();
    const [path,setPathName] = useState("/")
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };
    useEffect(()=>{
        let user = window.localStorage.getItem('user');
        let email = window.localStorage.getItem('email')||"";
        let isLoggedIn = window.localStorage.getItem('isLoggedIn');
        let loggedInUser = JSON.parse(user || '{}');

        if(loggedInUser?.isAdmin === true && isLoggedIn ===loggedInUser?.email){
            login(email,true)
            
        }
        else if(isLoggedIn ===loggedInUser?.email ){

            login(email,false)
        }
        
  
    },[])

    
    
    const handleLogout=()=>{
        window.localStorage.removeItem('isLoggedIn');
        logout()
       
    }



    return (
        <nav className="bg-gray-900 border-gray-200 pb-[3%]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">কুইজ মেলা</span>
                </Link>
                <button 
                    onClick={toggleMenu}
                    type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    aria-controls="navbar-default" 
                    aria-expanded={isOpen}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-900">
                        <li>
                            <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
                        </li>
                       {!isLoggedIn &&  <li>
                            <Link href="/login" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                        </li>}
                     
                    {isLoggedIn &&  <li onClick={handleLogout}>
                            <Link href="/" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Log Out</Link>
                        </li>}   
                       { !isLoggedIn && <li>
                            <Link href="/registration" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Registration</Link>
                        </li>
                       }

{ isAdmin && <li>
                            <Link href="/questions" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Questions</Link>
                        </li>
                       }

{ isAdmin && <li>
                            <Link href="/questions-upload" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Upload Quiz</Link>
                        </li>
                       }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

const SignIn: React.FC = () => {
    const router = useRouter();
    const {login}= useAuth()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const remember = formData.get('remember') as string;
    window.localStorage.setItem('isLoggedIn', email);
    const role = window.localStorage.getItem('user')||""
    // const isAdmin = JSON.parse(role)?.isAdmin
    if(email ===window.localStorage.getItem('email') && password ===window.localStorage.getItem('password')&&(email===JSON.parse(role)?.email) && JSON.parse(role)?.isAdmin === true){
      login(email,true)
      router.push('/questions-upload')
    }
    else if(email ===window.localStorage.getItem('email') && password ===window.localStorage.getItem('password')){
      login(email,false)
        router.push('/game')
    }
    else {
      Swal.fire({
        title: "Error!",
        text: "Invalid email or password",
        icon: "error",
      })
    }

    
  };

  return (
    <section className=" bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold  text-white">
         
        কুইজ মেলা
        </a>
        <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className="w-4 h-4 border  focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className=" text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-white">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full ring-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light  text-gray-400">
                Don’t have an account yet?{' '}
                <a href="/registration" className="font-semibold text-primary-600 text-blue-700 hover:underline ">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

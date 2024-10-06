'use client'


import { useState } from 'react';
import Swal from 'sweetalert2';

const SignUpForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);


  const handleAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(e.target.checked);
    Swal.fire({
      title: "Warning!",
      text: "Dummy Permission",
      icon: "warning",
    }).then((res)=>{
      if(res.isConfirmed){
        setIsAdmin(e.target.checked);
      }
      else{
        setIsAdmin(false);
      }
    })
    
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match.",
        icon: "error",
      });
      return;
    }
    else {
      Swal.fire({
        title: "Success!",
        text: "Congratulations! Your account has been created.",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          
          window.location.href = '/login';
        }
      })
    }

    // Save the form data in localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password); // Storing password in localStorage is generally not recommended!
    localStorage.setItem('acceptedTerms', JSON.stringify(acceptedTerms));
    localStorage.setItem('user', JSON.stringify({ email, isAdmin }));
    // Example action upon successful form submission
   
  };

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center bg-gray-900 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
         
        কুইজ মেলা
        </a>
        <div className="w-full rounded-lg bg-slate-800 shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-white tracking-tight t md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="isAdmin"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 :bg-gray-700 :border-gray-600 :focus:ring-primary-600 :ring-offset-gray-800"
                    checked={isAdmin}
                    onChange={(e)=>handleAdmin(e)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-300"
                  >
                    I wanna be  an admin
                    
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 :bg-gray-700 :border-gray-600 :focus:ring-primary-600 :ring-offset-gray-800"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline :text-primary-500"
                      href=""
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full ring-2 text-white bg-primary-600 hover:bg-primary-700 ring-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold text-blue-800 text-primary-600 hover:underline :text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;

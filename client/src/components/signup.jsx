import react from 'react'
import axios from 'axios'
import Cookies from "universal-cookie"
function SignUp({ setIsAuth }) {
      const [user, setUser] = react.useState(null);
      const cookies = new Cookies();
      const signUp = () => {
            axios.post("http://localhost:3001/signup", user).then(res => {
                  const { token, userId, firstName, lastName, hashedPassword, username } = res.data;
                  cookies.set("token", token);
                  cookies.set("userId", userId);
                  cookies.set("firstName", firstName);
                  cookies.set("username", username);
                  cookies.set("lastName", lastName);
                  cookies.set("hashedPassword", hashedPassword);
                  setIsAuth(true);
            });
      };
      return (
            <div className='signup w-full my-5 mx-auto max-w-[600px] p-10 bg-white rounded-lg shadow'>
                  <h2 className="mb-10 text-3xl font-bold text-center">Sign Up Form</h2>
                  <div className="flex flex-col items-start mb-5 gap-y-3">
                        <label htmlFor="firstName" className="text-sm font-medium cursor-pointer">
                              firstName
                        </label>
                        <input
                              id="firstName"
                              type="text"
                              className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
                              placeholder="Your FirstName"
                              onChange={(e) => {
                                    setUser({ ...user, firstName: e.target.value });
                              }}
                        />
                  </div>
                  <div className="flex flex-col items-start mb-5 gap-y-3">
                        <label htmlFor="lastName" className="text-sm font-medium cursor-pointer">
                              Last Name
                        </label>
                        <input
                              id="lastName"
                              type="text"
                              className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
                              placeholder="Your lastName"
                              onChange={(e) => {
                                    setUser({ ...user, lastName: e.target.value });
                              }}
                        />
                  </div>
                  <div className="flex flex-col items-start mb-5 gap-y-3">
                        <label htmlFor="lastName" className="text-sm font-medium cursor-pointer">
                              user name
                        </label>
                        <input
                              id="username"
                              type="text"
                              className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
                              placeholder="Your username"
                              onChange={(e) => {
                                    setUser({ ...user, username: e.target.value });
                              }}
                        />
                  </div>
                  <div className="flex flex-col items-start mb-5 gap-y-3">
                        <label
                              htmlFor="password-s"
                              className="text-sm font-medium cursor-pointer"
                        >
                              Password
                        </label>
                        <input
                              id="password-s"
                              type="password"
                              className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
                              placeholder="Enter your password"
                              onChange={(e) => {
                                    setUser({ ...user, password: e.target.value });
                              }}
                        />
                  </div>
                  <div className="text-start justify-end mb-5 text-slate-400">
                        <p>Already have an account?</p>
                        <a href="./#" className="text-blue-500 underline">
                              login
                        </a>
                  </div>
                  <button
                        className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                        onClick={signUp}
                  >
                        Create an account
                  </button>
            </div>
      )
}
export default SignUp;
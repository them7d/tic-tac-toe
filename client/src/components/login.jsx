import axios from 'axios';
import react from 'react';
import Cookies from "universal-cookie"
function Login({ setIsAuth }) {
      const cookies = new Cookies();
      const [username, setUsername] = react.useState("");
      const [password, setPassword] = react.useState("");
      const login = () => {
            axios.post("http://localhost:3001/login", {
                  username,
                  password
            }).then((res) => {
                  const { token, userId, firstName, lastName, username } = res.data;
                  console.log(token);
                  cookies.set("token", token);
                  cookies.set("userId", userId);
                  cookies.set("firstName", firstName);
                  cookies.set("lastName", lastName);
                  cookies.set("username", username);
                  setIsAuth(true);
            });
      };
      return (
            <div className='login w-full my-5 mx-auto max-w-[600px] p-10 bg-white rounded-lg shadow'>
                  <h2 className="mb-10 text-3xl font-bold text-center">login</h2>
                  <div className="flex flex-col items-start mb-5 gap-y-3">
                        <label htmlFor="userName" className="text-sm font-medium cursor-pointer">
                              userName
                        </label>
                        <input
                              id="userName"
                              type="text"
                              className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
                              placeholder="Your userName"
                              onChange={(e) => {
                                    setUsername(e.target.value);
                              }}
                        />
                  </div>
                  <div className="flex flex-col items-start mb-5 gap-y-3">
                        <label
                              htmlFor="password"
                              className="text-sm font-medium cursor-pointer"
                        >
                              Password
                        </label>
                        <input
                              id="password"
                              type="password"
                              className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
                              placeholder="Enter your password"
                              onChange={(e) => {
                                    setPassword(e.target.value);
                              }}
                        />
                  </div>
                  <div className="text-start justify-end mb-5 text-slate-400">
                        <p>Do not have an account?</p>
                        <a href="./#" className="text-blue-500 underline">
                              Sign Up
                        </a>
                  </div>
                  <button
                        className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                        onClick={login}
                  >
                        login
                  </button>
            </div >
      )
}

export default Login
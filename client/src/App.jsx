import './App.css'
import Login from './components/login'
import Signup from './components/signup'
import Cookies from "universal-cookie"
import react from "react"
import { Chat } from "stream-chat-react"
import JoinGame from "./components/joinGame"
import { StreamChat } from "stream-chat"
function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const api_key = process.env.REACT_APP_API_KEY;
  const client = new StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = react.useState(false);
  const logout = () => {
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };
  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword")
    }, token
    ).then(() => {
      setIsAuth(true);
    });
  }
  return (
    <div className="App">
      {isAuth ? (
        <>
          <Chat client={client}>
            <JoinGame />
          </Chat>
          <button
            className="block w-fit mx-auto items-center justify-center px-8 py-4 my-5 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
            onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Login setIsAuth={setIsAuth} />
          <Signup setIsAuth={setIsAuth} />
        </>
      )}

    </div>
  );
}

export default App;

import react from 'react'
// import useChatContext to pass client that streamchat instance value 
// from app.js to here
import { useChatContext, Channel } from "stream-chat-react"
import Game from "./Game"
function JoinGame() {
      const [rivalUsername, setRivalUsername] = react.useState("");
      const { client } = useChatContext();
      const [channel, setChannel] = react.useState("");
      const createChannel = async () => {
            const response = await client.queryUsers({ name: { $eq: rivalUsername } });
            if (response.users.length === 0) {
                  return alert("user note found");
            }
            const newChannel = await client.channel("messaging", {
                  members: [client.userID, response.users[0].id],
            });
            await newChannel.watch();
            setChannel(newChannel);
      };

      return (
            <>
                  {channel ? (
                        <Channel channel={channel}>
                              <Game channel={channel} />
                        </Channel>
                  ) : (
                        <div className="joingame flex flex-col max-w-[250px] mx-auto my-24">
                              <input className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-white" type="text" placeholder='username of rival...' onChange={e => setRivalUsername(e.target.value)} />
                              <button
                                    className="inline-flex items-center justify-center px-8 py-4 my-16 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                                    onClick={createChannel}
                              >
                                    joinGame
                              </button>
                        </div>
                  )
                  }
            </>
      )
}

export default JoinGame
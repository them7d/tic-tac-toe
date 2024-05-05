import { React, useState } from 'react'
import Board from './board'
import { Window, MessageList, MessageInput, useMessageInputContext } from "stream-chat-react"
import "./chat.css"
import Arrow from "./arrow"
function Game({ channel }) {
      const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
      channel.on("user.watching.start", (event) => {
            setPlayersJoined(event.watcher_count === 2);
      });
      const [result, setResult] = useState({ winner: "none", state: "none" });
      if (!playersJoined) {
            return <div className='mx-auto w-fit my-5'>waiting for other player to join </div>;
      }
      const CustomMessageInput = () => {
            const { text, handleChange, handleSubmit } = useMessageInputContext();
            return (
                  <div className='message-input str-chat__input-flat--textarea-wrapper'>
                        <textarea value={text} className='message-input__input str-chat__textarea' onChange={handleChange} />
                        <button type='button' className='message-input__button' onClick={handleSubmit}><Arrow /></button>
                  </div>
            );
      };
      return (
            <div className="gameContainer">
                  <Board result={result} setResult={setResult} className={result.state === "won" && "winned"} />
                  <Window>
                        <MessageList hideDeletedMessages autoScrollToBottom={true} disableDateSeparator ReactionSelector={false} disableQuotedMessages messageActions={[]} />
                        <MessageInput noFiles Input={CustomMessageInput} />
                  </Window>
            </div>
      )
}

export default Game;

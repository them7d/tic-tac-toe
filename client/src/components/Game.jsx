import { React, useState } from 'react'
import Board from './board'
function Game({ channel }) {
      const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
      channel.on("user.watching.start", (event) => {
            setPlayersJoined(event.watcher_count === 2);
      });
      const [result, setResult] = useState({ winner: "none", state: "none" });
      if (!playersJoined) {
            return <div className='mx-auto w-fit my-5'>waiting for other player to join </div>;
      }

      return (
            <div result={result} setResult={setResult} className="gameContainer">
                  <Board />
                  {/* CHAT */}
                  {/* LEAVE BUTTON */}
            </div>
      )
}

export default Game;
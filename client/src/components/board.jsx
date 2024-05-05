import { React, useState, useEffect } from 'react'
import { useChannelStateContext, useChatContext } from "stream-chat-react"
import Square from './square'
import { Patterns } from '../WinningPatterns'
import "./board.css"
function Board({ result, setResult }) {
      const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
      const [player, setPlayer] = useState("X");
      const [turn, setTurn] = useState("X");
      const { channel } = useChannelStateContext();
      const { client } = useChatContext();
      useEffect(() => {
            checkWin();
            checkIfTie();
      }, [board]);
      // for local user move
      const chooseSquare = async (square) => {
            if (player === turn && board[square] === "") {
                  setTurn(player === "X" ? "O" : "X")
                  await channel.sendEvent({
                        type: "game-move",
                        data: { square, player }
                  });
                  setBoard(board.map((val, index) => {
                        if (index === square && val === "") {
                              return player
                        };
                        return val
                  }));
            }
      }

      const checkWin = () => {
            Patterns.forEach((currPattern) => {
                  const firstPlayer = board[currPattern[0]];
                  if (firstPlayer == "") return;
                  let foundWinningPattern = true;
                  currPattern.forEach((idx) => {
                        if (board[idx] != firstPlayer) {
                              foundWinningPattern = false;
                        }
                  });
                  if (foundWinningPattern) {
                        setResult({ winner: board[currPattern[0]], state: "won" });
                  }
            })
      }
      // check if it tie
      const checkIfTie = () => {
            let filled = true;
            board.forEach((square) => {
                  if (square == "") {
                        filled = false;
                  }
            });
            if (filled) {
                  setResult({ winner: "none", state: "tie" });
            }
      }

      // when the second player move the game
      channel.on((event) => {
            if (event.type === "game-move" && event.user.id !== client.userID) {
                  const currentPlayer = event.data.player === "X" ? "O" : "X";
                  setPlayer(currentPlayer);
                  setTurn(currentPlayer);
                  setBoard(board.map((val, index) => {
                        if (index === event.data.square && val === "") {
                              return event.data.player
                        };
                        return val
                  }));
            }
      });
      const resetGame = () => {
            setBoard(board.map(() => {
                  return "";
            }));
            setResult({ winner: "none", state: "none" });
      }
      const resetBoard = async () => {
            await channel.sendEvent({
                  type: "reset-board",
                  data: { player }
            });
            resetGame();
      }
      channel.on((event) => {
            if (event.type === "reset-board") {
                  resetGame();
            }
      });
      // button reset
      const ResetBtn = () => {
            return (
                  <>
                        <button onClick={resetBoard} className="flex items-center justify-center w-fit mx-auto mt-7 px-5 py-1 text-base text-white bg-blue-500 rounded-full cursor-pointer">
                              reset
                        </button>
                  </>
            )
      }
      return (
            <div className='board bg-[white] mx-auto max-w-fit my-10 border border-collapse'>
                  {result.state !== "none" && <div className='winned text-3xl font-bold text-center'>
                        <div className="inner-win p-10">
                              {result.state === "won" ? `${result.winner} won` : "It's a tie"}
                              {ResetBtn()}
                        </div>
                  </div>}
                  <div className="row flex justify-strench">
                        <Square chooseSquare={() => { chooseSquare(0) }} val={board[0]} />
                        <Square chooseSquare={() => { chooseSquare(1) }} val={board[1]} />
                        <Square chooseSquare={() => { chooseSquare(2) }} val={board[2]} />
                  </div>
                  <div className="row flex">
                        <Square chooseSquare={() => { chooseSquare(3) }} val={board[3]} />
                        <Square chooseSquare={() => { chooseSquare(4) }} val={board[4]} />
                        <Square chooseSquare={() => { chooseSquare(5) }} val={board[5]} />
                  </div>
                  <div className="row flex">
                        <Square chooseSquare={() => { chooseSquare(6) }} val={board[6]} />
                        <Square chooseSquare={() => { chooseSquare(7) }} val={board[7]} />
                        <Square chooseSquare={() => { chooseSquare(8) }} val={board[8]} />
                  </div>
            </div>
      )
}

export default Board
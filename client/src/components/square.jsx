import React from 'react'

function Square({ chooseSquare, val }) {
      return (
            <div className='square p-20 w-[200px] h-[200px] hover:bg-[#03AED2] hover:text-white cursor-pointer text-4xl border border-solid' onClick={chooseSquare}>
                  {val}
            </div>
      )
}

export default Square
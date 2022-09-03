import React from 'react'

import './GameBoard.css'

export default function GameBoard({ numSquares}) {
  const squares = [...Array(numSquares)].map(() => Math.random())
  return (
    <div className='squares'>
      {squares.map((id) => (
        <div className='square' id={id}>
          <img className='cirle' src='../../img/circle.png' alt='cirle'/>
          <img className='cross' src='../../img/cross.png' alt='cross'/>
        </div>
      ))}
    </div>
  )
}

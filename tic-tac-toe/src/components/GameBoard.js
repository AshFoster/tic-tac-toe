import React, { useEffect, useState } from 'react'

import './GameBoard.css'

export default function GameBoard({ numSquares, reset, setReset }) {
  const [squares, setSquares] = useState([...Array(numSquares)].map(() => ({ id: Math.random(), selected: false, disabled: false })))
  const [turns, setTurns] = useState(0)
  const [selectedSquare, setSelectedSquare] = useState(null)

  const handleClick = (id, disabled) => {
    if (!disabled) {
      setTurns(prevTurns => prevTurns + 1)
      setSelectedSquare(id)
    }
  }

  useEffect(() => {
    if (!reset) {
      if (turns !== 0) {
        setSquares(prevSquares => {
          return prevSquares.map(square => {
            if (square.id === selectedSquare) {
              return {...square, selected: true, disabled: true, turn: turns}
            } else {
              return square
            }
          })
        })
      }
    } else {
      setSquares([...Array(numSquares)].map(() => ({ id: Math.random(), selected: false, disabled: false })))
      setTurns(0)
      setSelectedSquare(null)
      setReset(false)
    }
  }, [turns, selectedSquare, reset])

  return (
    <div className='squares'>
      {squares.map((square) => (
        <div className={square.selected ? 'square selected' : 'square'} key={square.id} id={square.id} onClick={() => handleClick(square.id, square.disabled)}>
          <img className={square.selected && square.turn % 2 !== 0 ? 'selected' : ''} src='../../img/circle.png' alt='circle'/>
          <img className={square.selected && square.turn % 2 === 0 ? 'selected' : ''} src='../../img/cross.png' alt='cross'/>
        </div>
      ))}
    </div>
  )
}

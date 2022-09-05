import React, { useCallback, useEffect, useState } from 'react'

import './GameBoard.css'

export default function GameBoard({ numSquares, reset, setReset }) {
  const initialSquares = [...Array(numSquares)].map((value, index) => (value = { id: index + 1, selected: false, disabled: false }))
  const [squares, setSquares] = useState([...initialSquares])
  const [turns, setTurns] = useState(0)

  const handleClick = (id, disabled) => {
    if (!disabled) {
      setSquares(prevSquares => {
        return prevSquares.map(square => {
          if (square.id === id) {
            return {...square, selected: true, disabled: true, turn: turns + 1}
          } else {
            return square
          }
        })
      })
      setTurns(prevTurns => prevTurns + 1)
    }
  }

  const computerTurn = useCallback(() => {
    let availableSquares = squares.filter(square => !square.selected)
    let computerChoice = availableSquares[Math.floor(Math.random() * availableSquares.length)].id
    setTimeout(() => {
      document.getElementById(computerChoice).click()
    }, 1000)
  }, [squares])

  const resetGame = () => {
    setSquares([...initialSquares])
    setTurns(0)
    setReset(false)
  }

  useEffect(() => {
    if (turns % 2 !== 0 && turns < 9) {
      computerTurn()
    }
  }, [turns, computerTurn])

  useEffect(() => {
    if (reset) {
      resetGame()
    }
  })

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

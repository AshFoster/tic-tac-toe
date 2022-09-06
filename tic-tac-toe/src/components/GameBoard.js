import React, { useCallback, useEffect, useState } from 'react'

import './GameBoard.css'

export default function GameBoard({ numSquares, reset, setReset }) {
  const initialSquares = [...Array(numSquares)].map((value, index) => (value = { id: index + 1, selected: false, disabled: false }))
  const winningCombos9 = [123, 456, 789, 147, 258, 369, 159, 357].map(value => value.toString().split(''))
  const [squares, setSquares] = useState([...initialSquares])
  const [turns, setTurns] = useState(0)
  const [endGame, setEndGame] = useState(false)

  // handle player clicks
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

  // calculate winning squares or squares to block
  const calcWinningSquares = useCallback((playerType) => {
    let playerTurns = []
    if (playerType === 'computer') {
      playerTurns = squares.filter(square => square.turn && square.turn % 2 === 0)
    } else if (playerType === 'player'){
      playerTurns = squares.filter(square => square.turn && square.turn % 2 !== 0)
    } else {
      return [[], []]
    }
    
    let playerSquares = [...playerTurns.map((square) => square.id)].join('')

    let winningSquares = winningCombos9.map((combo) => {
      return combo.filter((comboItem) => {
        return !playerSquares.includes(comboItem)
      })
    }).filter(combo => combo.length === 1).map(array => parseInt(array))

    return [winningSquares, playerSquares]
  }, [winningCombos9, squares])

  // simulate computer turn
  const computerTurn = useCallback(() => {
    let [winningSquaresPlayer, playerSquares] = calcWinningSquares('player')
    let [winningSquaresComputer] = calcWinningSquares('computer')
    winningSquaresComputer = winningSquaresComputer.filter(square => !playerSquares.includes(square))

    let winningSquares = []

    if (winningSquaresComputer.length) {
      winningSquares = winningSquaresComputer
    } else {
      winningSquares = winningSquaresPlayer
    }

    let availableSquares = []

    if (winningSquares.length) {
      availableSquares = squares.filter(square => !square.selected && winningSquares.includes(square.id))
    }

    if (!availableSquares.length) {
      availableSquares = squares.filter(square => !square.selected)
    }

    let computerChoice = availableSquares[Math.floor(Math.random() * availableSquares.length)].id

    document.getElementById('gameBoard').style.pointerEvents = 'none'

    setTimeout(() => {
      document.getElementById('gameBoard').style.pointerEvents = 'auto'
      document.getElementById(computerChoice).click()
    }, 1000)
  }, [squares, calcWinningSquares])

  // reset game
  const resetGame = () => {
    setSquares([...initialSquares])
    setTurns(0)
    setReset(false)
    setEndGame(false)
    document.getElementById('winner').textContent = ''
  }

  // check if there is a winner
  const checkWinner = useCallback(() => {
    let playerTurns = []
    let player = ''
    if (turns % 2 !== 0) {
      playerTurns = squares.filter(square => square.turn && square.turn % 2 !== 0)
      player = 'Player'
    } else {
      playerTurns = squares.filter(square => square.turn && square.turn % 2 === 0)
      player = 'Computer'
    }
    let playerSquares = [...playerTurns.map((square) => square.id)].join('')
    let winner = winningCombos9.some((combo) => {
      return combo.every((comboItem) => {
        return playerSquares.includes(comboItem)
      })
    })
    return [winner, player]
  }, [turns, squares, winningCombos9])

  // plays computer turn or updates winner paragraph and sets endGame if there's a winner
  useEffect(() => {
    const [winner, player] = checkWinner()
    if (winner && !endGame) {
      document.getElementById('winner').textContent = `${player} wins!`
      setEndGame(true)
    }
    if (turns % 2 !== 0 && turns < 9 && !winner) {
      computerTurn()
    }
  }, [turns, computerTurn, checkWinner, endGame])

  // resets game settings if reset is true
  useEffect(() => {
    if (reset) {
      resetGame()
    }
  })

  // sets all squares to disabled if endGame is true
  useEffect(() => {
    if (endGame) {
      setSquares(prevSquares => {
        return prevSquares.map(square => {
          return {...square, disabled: true}
        })
      })
    }
  }, [endGame])

  return (
    <div className='squares' id='gameBoard'>
      {squares.map((square) => (
        <div className={square.selected ? 'square selected' : 'square'} key={square.id} id={square.id} onClick={() => handleClick(square.id, square.disabled)}>
          <img className={square.selected && square.turn % 2 !== 0 ? 'selected' : ''} src='../../img/circle.png' alt='circle'/>
          <img className={square.selected && square.turn % 2 === 0 ? 'selected' : ''} src='../../img/cross.png' alt='cross'/>
        </div>
      ))}
    </div>
  )
}

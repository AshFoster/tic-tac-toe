import { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';

function App() {
  const [numSquares, setNumSquares] = useState(9);
  const [reset, setReset] = useState(false)

  const resetGame = () => {
    setReset(true)
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>New Game</button>
      <div className='game-area'>
        <GameBoard numSquares={numSquares} reset={reset} setReset={setReset}/>
      </div>
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';

function App() {
  const numSquares = 9;
  const [reset, setReset] = useState(false)

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <button onClick={() => setReset(true)}>New Game</button>
      <div className='game-area'>
        <GameBoard numSquares={numSquares} reset={reset} setReset={setReset}/>
      </div>
      <p id='winner'></p>
    </div>
  );
}

export default App;

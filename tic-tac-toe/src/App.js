import './App.css';
import GameBoard from './components/GameBoard';

function App() {
  let numSquares = 9;
  
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <button>New Game</button>
      <div className='game-area'>
        <GameBoard numSquares={numSquares}/>
      </div>
    </div>
  );
}

export default App;

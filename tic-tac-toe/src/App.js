import './App.css';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <button>New Game</button>
      <div className='game-area'>
        <GameBoard />
      </div>
    </div>
  );
}

export default App;

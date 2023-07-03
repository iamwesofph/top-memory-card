/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './App.css'
import aphrodite from './assets/Aphrodite.webp'
import ares from './assets/Ares.webp'
import artemis from './assets/Artemis.webp'
import athena from './assets/Athena.webp'
import poseidon from './assets/Poseidon.webp'
import thanatos from './assets/Thanatos.webp'
import zeus from './assets/Zeus.webp'
import zagreus from './assets/Zagreus.webp'
import hadesLogo from './assets/Hades_Logo.webp'


// let initialCharacters = [aphrodite, ares, artemis, athena, poseidon, thanatos, zeus, zagreus];
const initialCharacters = [
  { name: "Aphrodite", image: aphrodite, clicked: false },
  { name: "Ares", image: ares, clicked: false },
  { name: "Artemis", image: artemis, clicked: false },
  { name: "Athena", image: athena, clicked: false },
  { name: "Poseidon", image: poseidon, clicked: false },
  { name: "Thanatos", image: thanatos, clicked: false },
  { name: "Zeus", image: zeus, clicked: false },
  { name: "Zagreus", image: zagreus, clicked: false }
];


export default function MemoryGame() {
  const [characters, setCharacters] = useState(initialCharacters);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  let bestScore;

  useEffect(() => {
    randomizeCharactersState(); // Shuffle characters initially
  },[]);

  // On page initialization check if there is a stored value and use it, else use 0
  const storedValue = localStorage.getItem('bestScore');
  if (storedValue) {
    bestScore = parseInt(storedValue);
  } else {
    bestScore = 0;
  }

  function handleCharacterClick(index) {
    // Check if the character is already clicked
    if (characters[index].clicked === true) {
    
      // On Gameover, check if the score is higher than the bestscore in local storage and save it, else return
      if (score > bestScore) {
        localStorage.setItem('bestScore', score.toString());
      }
      setIsGameOver(true); // Display gameover

    } else {
      setScore(score + 1); // Increment score, update clicked attribute and then randomize
      // This is using updater function
      setCharacters(prevCharacters => {
        const nextCharacters = prevCharacters.map((character, i) => {
          if (i === index) {
            return { ...character, clicked: true };
          }
          return character;
        });
        return nextCharacters;
      });

      randomizeCharactersState();
    }
  }

  function randomizeCharactersState() {
    setCharacters(prevCharacters => {
      const newArray = shuffleArray([...prevCharacters]); // Randomize the array order
      return newArray;
    });
  }
  

  function startNewGame() {
    setIsGameOver(false);
    randomizeCharactersState();
    setScore(0);

    // Reset all characters' clicked to false
    setCharacters(prevCharacters => {
      const nextCharacters = prevCharacters.map(character => {
        return { ...character, clicked: false };  
      });
      return nextCharacters;
    });
  }

  return (
    <>
      <img src={hadesLogo} alt="hades logo" className='hadeslogo'/>
      <h1>Memory Game</h1>
      <h2>Never ask the same God twice!</h2>
      <GameOver score={score} onNewGameClick={startNewGame} show={isGameOver} />
      <ScoreBar score={score} bestScore={bestScore} />
      <Cards characters={characters} handleCharacterClick={handleCharacterClick} />
    </>
  );
}

function ScoreBar({score, bestScore}) {
  
    return (
        <div className='scorebar'>
            <span>Score: {score}</span>
            <span>Best Score: {bestScore}</span>
        </div>
    );
}

// characters = shuffleArray(characters);
// eslint-disable-next-line react/prop-types
function Cards({characters, handleCharacterClick}) {
    return (
      <>
          <div className='container'>
              <Card character={characters[0]} handleCharacterClick={() => handleCharacterClick(0)}/>
              <Card character={characters[1]} handleCharacterClick={() => handleCharacterClick(1)}/>
              <Card character={characters[2]} handleCharacterClick={() => handleCharacterClick(2)}/>
              <Card character={characters[3]} handleCharacterClick={() => handleCharacterClick(3)}/>
          </div>
          <div className='container'>
              <Card character={characters[4]} handleCharacterClick={() => handleCharacterClick(4)}/>
              <Card character={characters[5]} handleCharacterClick={() => handleCharacterClick(5)}/>
              <Card character={characters[6]} handleCharacterClick={() => handleCharacterClick(6)}/>
              <Card character={characters[7]} handleCharacterClick={() => handleCharacterClick(7)}/>
          </div>
      </>
    );
}

function Card({character, handleCharacterClick}) {
    return (
      <div className='card' onClick={ handleCharacterClick}>
              <img src={character.image} className='logo react' alt={character.name} />
              <span>{character.name}</span>
      </div>
    );
}


function shuffleArray(array) {
  const newArray = [...array]; // Create a copy of the original array
  
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    
    // Swap elements at index i and j
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}

function GameOver({ score, onNewGameClick, show}) {
  return (
    show && (
      <div className="modal-overlay">
        <div>
        <h2>Game Over!</h2>
        <p>Congratulations your Score is {score}</p>
        <button onClick={onNewGameClick}>New Game</button>
        </div>
      </div>
    )
  );
}

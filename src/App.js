import {useState, useEffect} from 'react';
import styles from './App.module.css';
import blue from './images/blue.png';
import red from './images/red.png';
import yellow from './images/yellow.png';
import orange from './images/orange.png';
import purple from './images/purple.png';
import green from './images/green.png';
import blank from './images/blank.png'

const WIDTH = 8;
const candyColors = [
  blue,
  red,
  yellow,
  orange,
  purple,
  green
]

function App() {
  const [currentCandies, setCurrentCandies] = useState([])

  const checkForThrees = () => {
    for (let i = 0; i < 47; i++) {
      const threeColumn = [i, i + WIDTH, i + WIDTH * 2]
      const pickedColor = currentCandies[i];

      if (threeColumn.every(threeColumnNumber => currentCandies[threeColumnNumber] === pickedColor)) {
        threeColumn.forEach(threeColumnNumber => currentCandies[threeColumnNumber] = '')
      }
    }
  }

  const createBoard = () => {
    const randomCandies = [];
    for (let i = 0; i < WIDTH*WIDTH; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomCandies.push(randomColor)
    }
    setCurrentCandies(randomCandies)
  }

  useEffect(() => {
    createBoard()
  }, [])

  return (
    <>
    <div className={styles.app}>
      <div className={styles.game}>
        {currentCandies.map((candy, index) => (
          <img
          key={index}
          className={styles.imgContainer}
          src={candy}/>
        ))}
      </div>
      
    </div>
    </>
  );
}

export default App;

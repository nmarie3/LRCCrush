import {useState, useEffect} from 'react';
import styles from './App.module.css';
import takina from './images/takina.png';
import chisato from './images/chisato.png';
import kurumi from './images/kurumi.png';
import robota from './images/robota.png';
import flower from './images/flower.png';
import majima from './images/majima.png';
import blank from './images/blank.png'

const WIDTH = 8;
const candyColors = [
  takina,
  chisato,
  kurumi,
  robota,
  flower,
  majima
]

function App() {
  const [currentCandies, setCurrentCandies] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null)
  const [replacedItem, setReplacedItem] = useState(null)

  const checkColumnThrees = () => {
    for (let i = 0; i <= 47; i++) {
      const threeColumn = [i, i + WIDTH, i + WIDTH * 2]
      const pickedColor = currentCandies[i];

      if (threeColumn.every(item => currentCandies[item] === pickedColor)) {
        threeColumn.forEach(item => currentCandies[item] = '')
        return true
      }
    }
  }

  const checkColumnFours = () => {
    for (let i = 0; i <= 39; i++) {
      const fourColumn = [i, i + WIDTH, i + WIDTH * 2, i + WIDTH * 3]
      const pickedColor = currentCandies[i];

      if (fourColumn.every(item => currentCandies[item] === pickedColor)) {
        fourColumn.forEach(item => currentCandies[item] = '')
        return true
      }
    }
  }

  const checkRowThrees = () => {
    for (let i = 0; i < 64; i++) {
      const threeRow = [i, i + 1, i + 2]
      const pickedColor = currentCandies[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

      if (notValid.includes(i)) continue

      if (threeRow.every(item => currentCandies[item] === pickedColor)) {
        threeRow.forEach(item => currentCandies[item] = '')
        return  true
      }
    }
  }

  const checkRowFours = () => {
    for (let i = 0; i < 64; i++) {
      const fourRow = [i, i + 1, i + 2, i + 3]
      const pickedColor = currentCandies[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if (notValid.includes(i)) continue

      if (fourRow.every(item => currentCandies[item] === pickedColor)) {
        fourRow.forEach(item => currentCandies[item] = '')
        return true
      }
    }
  }


  const moveBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (firstRow && currentCandies[i] === '') {
        let randomCandy = Math.floor(Math.random() * candyColors.length)
        currentCandies[i] = candyColors[randomCandy]
      }

      if (currentCandies[i + WIDTH] === '') {
        currentCandies[i + WIDTH] = currentCandies[i];
        currentCandies[i] = ''
      } 
    }
  }

  const dragStart = (e) => {
    setDraggedItem(e.target)
  }

  const dragDrop = (e) => {
    setReplacedItem(e.target)
  }

  const dragEnd = (e) => {
    const draggedItemId = parseInt(draggedItem.getAttribute('data-id'))
    const replacedItemId = parseInt(replacedItem.getAttribute('data-id'))

    const updatedCandies = [...currentCandies];
    currentCandies[replacedItemId] = draggedItem.src;
    currentCandies[draggedItemId] = replacedItem.src;

    const validMoves = [
      draggedItemId - 1,
      draggedItemId - WIDTH,
      draggedItemId + 1,
      draggedItemId + WIDTH
    ]

    const validMove = validMoves.includes(replacedItemId)
    console.log('valid move', validMove)

    const isColumnFours = checkColumnFours()
    const isRowFours = checkRowFours()
    const isColumnThrees = checkColumnThrees()
    const isRowThrees = checkRowThrees()

    if (replacedItemId && validMove && (isRowThrees || isColumnFours || isColumnThrees || isRowFours)) {
      setCurrentCandies(updatedCandies);
      setDraggedItem(null)
      setReplacedItem(null)
    } else {
      currentCandies[replacedItemId] = replacedItem.src
      currentCandies[draggedItemId] = draggedItem.src
      setCurrentCandies([...currentCandies])
    }
  }



  const createBoard = () => {
    const randomCandies = [];
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomCandies.push(randomColor)
    }
    setCurrentCandies(randomCandies)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnFours()
      checkColumnThrees()
      checkRowFours()
      checkRowThrees()
      moveBelow()
      setCurrentCandies([...currentCandies])
    }, 100)
    return () => clearInterval(timer)
  }, [checkColumnFours, checkColumnThrees, checkRowFours, checkRowThrees, moveBelow, currentCandies])

  return (
    <>
    <div className={styles.app}>
      <div className={styles.game}>
        {currentCandies.map((candy, index) => (
          <img
          key={index}
          className={styles.imgContainer}
          src={candy}
          data-id={index}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
          />
        ))}
      </div>
      
    </div>
    </>
  );
}

export default App;

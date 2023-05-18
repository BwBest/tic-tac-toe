const game = () => {
  //Create gameboard
  const gameBoard = [];
  for (let i = 0; i < 9; i++) {
    gameBoard.push('');
  }

  //Get gamebox references
  const gameBoardDomRefs = [];
  for (let i = 0; i < 9; i++) {
    gameBoardDomRefs.push(document.querySelector(`#box${i}`));
  }
  //Add event listener to boxes on dom
  for (ref of gameBoardDomRefs) {
    ref.addEventListener('click', clickEvent);
  }

  //Restart button
  const restartBtnRef = document.querySelector('#restart-game');
  restartBtnRef.addEventListener('click', restartGame);

  function restartGame() {
    gameBoard.splice(0, gameBoard.length);
    for (let i = 0; i < 9; i++) {
      gameBoard.push('');
    }
    displayController.resetDisplay();
    displayController.hideModal();
  }

  function clickEvent(e) {
    console.log('ping');
    const boxNumber = e.target.id.charAt(3);
    if (gameBoard[boxNumber] !== '') {
      return;
    }
    displayController.changeBoxText(boxNumber, 'X');
    gameBoard[boxNumber] = 'X';
    checkWin();
    if (gameBoard.includes('')) {
      aiPlay();
    } else {
    }
  }

  function aiPlay() {
    if (gameBoard.includes('')) {
      const boxNumber = Math.floor(Math.random() * 9);

      if (gameBoard[boxNumber] === '') {
        displayController.changeBoxText(boxNumber, 'O');
        gameBoard[boxNumber] = 'O';
        checkWin();
      } else {
        aiPlay();
      }
    } else {
      displayController.displayModal("It's a draw");
    }
  }

  function checkWin() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      if (
        board.gameBoard[winningCombinations[i][0]] ===
          board.gameBoard[winningCombinations[i][1]] &&
        board.gameBoard[winningCombinations[i][1]] ===
          board.gameBoard[winningCombinations[i][2]] &&
        board.gameBoard[winningCombinations[i][1]] !== ''
      ) {
        if (board.gameBoard[winningCombinations[i][1]] === 'O') {
          displayController.displayModal('Opps! Computer Won!');
          return;
        } else {
          displayController.displayModal('Congratz! You Won!');
          return;
        }
      }
    }
    if (!gameBoard.includes('')) {
      displayController.displayModal("It's a draw!");
    }
  }

  return { gameBoardDomRefs, gameBoard };
};

const displayController = (() => {
  const modalRef = document.querySelector('#modal');
  const modalTextRef = document.querySelector('#modal-text');
  const bgBlockRef = document.querySelector('#bg-block');

  const resetDisplay = () => {
    for (ref of board.gameBoardDomRefs) {
      ref.textContent = '';
    }
  };

  const changeBoxText = (boxIndex, text) => {
    board.gameBoardDomRefs[boxIndex].textContent = text;
  };

  const displayModal = (text) => {
    modalRef.classList.remove('hide');
    bgBlockRef.classList.remove('hide');
    modalTextRef.textContent = text;
  };

  const hideModal = () => {
    modalRef.classList.add('hide');
    bgBlockRef.classList.add('hide');
    modalTextRef.textContent = '';
  };

  return { resetDisplay, changeBoxText, displayModal, hideModal };
})();

const board = game();

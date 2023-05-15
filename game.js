const game = () => {
  //Get gamebox references
  const gameBoardDomRefs = [];
  for (let i = 0; i < 9; i++) {
    gameBoardDomRefs.push(document.querySelector(`#box${i}`));
  }
  //Create gameboard
  const gameBoard = [];
  for (let i = 0; i < 9; i++) {
    gameBoard.push('');
  }
  //Add event listener to boxes on dom
  for (ref of gameBoardDomRefs) {
    ref.addEventListener('click', clickEvent);
  }

  function clickEvent(e) {
    const boxNumber = e.target.id.charAt(3);
    e.target.textContent = 'X';
    gameBoard[boxNumber] = 'X';
    // console.log(gameBoard[boxNumber]);
    // console.log(gameBoard);
  }

  return { gameBoardDomRefs, gameBoard };
};

const gameBoard = game();

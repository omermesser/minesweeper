//event listeners

//opening buttons
btnSettings.addEventListener("click", clickOpen);
btnRules.addEventListener("click", clickOpen);
//closing buttons
btnCloseSettings.addEventListener("click", clickClose);
btnCloseRules.addEventListener("click", clickClose);
//restart buttons
btnRestart.addEventListener("click", clickRestart);
btnApply.addEventListener("click", clickRestart);
btnGameOverRestart.addEventListener("click", clickRestart);
//reset setting
btnResetSettings.addEventListener("click", clickResetSetting);

//functions
function clickRestart(){
    settingsWindow.style.display='none';
    rulesWindow.style.display='none';
    gameOverWindow.style.display='none';
    board.style.display='flex';
    resetBoard();
}

function clickOpen(event){
    minesInput.value = minesNumber;
    tilesInput.value = tilesNumber;
    board.style.display = 'none';
    settingsWindow.style.display='none';
    rulesWindow.style.display ='none';
    gameOverWindow.style.display = 'none';
    event.currentTarget.openingWindow.style.display='flex';
}
function clickClose(event){
    event.currentTarget.parentElement.style.display = 'none';
    minesInput.value = minesNumber;
    tilesInput.value = tilesNumber;
    boardSizeInput.value = boardSize;
    board.style.display='flex';
    if(returnToGameOver){
        gameOverWindow.style.display = 'flex';
    }
}

function clickResetSetting(){
     minesInput.value = 10;
     tilesInput.value = 9;
     boardSizeInput.value = 575;
}
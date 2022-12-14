

btnSettings.openingWindow = settingsWindow;
btnRules.openingWindow = rulesWindow;
settingsWindow.style.display="none"
rulesWindow.style.display="none"
gameOverWindow.style.display="none"
rulesWindow.style.fontSize=boardSize/30 + 'px';
setTiles();

//setting divs inside the board
function setTiles(){
    for(let r = 0; r < tilesNumber; r++){
        let columns = []; 
        for(let c = 0; c < tilesNumber; c++){
            let tile = document.createElement("div");
            tile.id=r.toString() +"-"+ c.toString(); //id = r-c
            tile.addEventListener("click", clickTile);
            tile.addEventListener("contextmenu", rightClickTile);
            columns[c] = tile;
            tile.style.height= boardSize/tilesNumber +'px'
            tile.style.width= boardSize/tilesNumber +'px'
            tile.style.fontSize = (boardSize/1.5)/tilesNumber +'px'
            tile.isMine = false;
            leftMinesId.push(tile.id);
            board.append(tile);

        }
        tiles[r]=columns;
    }
}

//setting the mines after first click
function setMines(tile){
    leftMinesId.splice(leftMinesId.indexOf(tile.id),1); //removes pressed tile from left mines
    for(let m = 0; m < minesNumber; m++){
        let mineIndex = Math.floor(Math.random() * leftMinesId.length);
        let mineId = leftMinesId[mineIndex];
        let splittedId = mineId.split('-');
        tiles[splittedId[0]][splittedId[1]].isMine=true;
        leftMinesId.splice(mineIndex,1);//removes selected mine from left mins
    }
}

function clickTile(){
    if(this.innerHTML!='🚩'){
        if(firstClick){
            firstClick = false;
            setMines(this);
        }
        if(this.isMine){
            gameEnd(false);
        }
        else{
            let split = this.id.split('-');
            checkNearby(split[0], split[1]);
        }
    }
}

//switching between flag/?/empty
function rightClickTile(event){
    event.preventDefault();
    if(!this.classList.contains("checked")){
        switch(this.innerHTML){
            case '🚩':
                flagCounter++;
                mineCounterNumber.innerHTML=flagCounter;
                this.innerHTML='?';
                break;
            case '?':
                this.innerHTML='';
                break;
            case '':
                flagCounter--;
                mineCounterNumber.innerHTML=flagCounter;
                this.innerHTML='🚩';
            default:
                break;
        }
    }
}

//recursion - counting nearby mines
function checkNearby(r, c){
    if (isNotValid(r, c)){
        return;
    }
    let tile = tiles[r][c];
    if (tile.classList.contains("checked")){
        return;
    }
    tile.classList.add("checked");
    revealedTiles++;
    if(revealedTiles === (tilesNumber*tilesNumber-minesNumber)){
        gameEnd(true);
    }
    let count = 0;
    r = parseInt(r);
    c = parseInt(c);
    for(let rAdd = -1; rAdd < 2; rAdd++){//checking nearby tiles
        for(let cAdd = -1; cAdd < 2; cAdd++){//row - column
            if(!isNotValid(r+rAdd, c+cAdd)){
                if(tiles[r+rAdd][c+cAdd].isMine){
                    count++;
                }
            }
        }
    }
    if(count!=0){
        tile.style.color= colors[count];
        tile.style.backgroundColor = '#d6a27f'
        tile.innerHTML=count;
        return;
    }
    for(let rAdd = -1; rAdd < 2; rAdd++){
        for(let cAdd = -1; cAdd < 2; cAdd++){
            checkNearby(r+rAdd, c+cAdd);
        }
    }
}


//checking if id doesn't exist
function isNotValid(r, c){
    return (r<0||c<0||r>tilesNumber-1||c>tilesNumber-1);
}

//revealing the mines according to win
function revealMines(isWin){
    let txt = "💣";
    let color ='red'
    if(isWin){
        txt='🚩';
        color = 'green'
    }
    tiles.forEach(row => {row.forEach(tile => {
        if(tile.isMine){
            if(tile.innerHTML==='🚩'){
                tile.style.backgroundColor = 'green'
            }
            else{
                tile.style.backgroundColor = color;
                tile.innerHTML = txt;
            }
        }
    })});
}



function resetBoard(){
    board.innerHTML='';
    tiles = [];
    leftMinesId = [];
    firstClick = true;
    revealedTiles = 0;
    if(tilesInput.value > MAX_TILE_NUM){
        tilesInput.value = MAX_TILE_NUM;
    }
    tilesNumber = tilesInput.value;
    if(minesInput.value > tilesNumber ** 2 - 1){
        minesInput.value = tilesNumber ** 2 - 1
    }
    minesNumber = minesInput.value;
    boardSize = boardSizeInput.value;
    returnToGameOver = false;
    flagCounter = minesNumber;
    mineCounterNumber.innerHTML = flagCounter;
    rulesWindow.style.fontSize=boardSize/30 + 'px';
    gameOverWindow.classList.remove("fadeIn");
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.width = boardSize + 'px'
        screen.style.height = boardSize + 'px'
    });
    setTiles();
}

function gameEnd(isWon){
    revealMines(isWon);
    returnToGameOver = true;
    gameOverWindow.style.display='flex';
    if(isWon){
        gameOverTitle.innerHTML='Victory!';
        gameOverTitle.style.backgroundColor = 'rgba(154, 255, 123, 0.8)';
        mineCounterNumber.innerHTML='0';
    }
    else{
        gameOverTitle.innerHTML='Defeat!'
        gameOverTitle.style.backgroundColor = 'rgba(236, 60, 60, 0.8)';
    }
    window.setTimeout(() => {
        gameOverWindow.classList.add("fadeIn");
    }, 1);
}
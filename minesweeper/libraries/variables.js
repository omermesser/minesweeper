const colors = ['white', 'blue', 'green', 'red','purple']
let tiles = [];
let leftMinesId = []; //mines to be randomized
let firstClick = true;
let revealedTiles = 0;
let minesNumber = 10;
let tilesNumber = 9;
let MAX_TILE_NUM = 50;
let boardSize = 575;
let returnToGameOver = false;
let flagCounter = 10;
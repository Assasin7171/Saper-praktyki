var board = [];
var rows = 10;
var columns = 10;

//pomocnicze zmienne
var rowArr = [];
var colArr = [];
//koniec pomocnicze zmienen

var minesCount = 5;
var minesLocation = []; //"2-2", "3-4", "2-1" itp

var titlesClicked = 0;
var flagEnable = false;

var gameOver = false;


window.onload = function () {
    startGame();
}
function setMines() {

    for (let i = 0; i <= minesCount; i++) {
        minesLocation.push(generateRows() + "-" + generateCols());
    }
    console.log(minesLocation);
}
function checkIsBomb() {

}

//retundancja....
//poprawić
function generateRows() {
    while (true) {
        let row = Math.floor(Math.random() * (rows + 1));
        Math.floor(row);
        if (!rowArr.includes(row)) {
            rowArr.push(row);

            return row.toString();
        }
    }
}
function generateCols() {
    while (true) {
        let col = Math.floor(Math.random() * (columns + 1));
        Math.floor(col)
        if (!colArr.includes(col)) {
            colArr.push(col);
            return col.toString();
        }
    }
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("btn-flag").addEventListener("click", setFlag);

    setMines();

    //populate board
    for (r = 0; r <= rows; r++) {
        let row = [];
        for (c = 0; c <= columns; c++) {
            //create div
            let tile = document.createElement("div");
            //tile.id = row-columns
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    //console.log(board);
}

function setFlag() {
    if (flagEnable) {
        flagEnable = false;
        document.getElementById("btn-flag").style.backgroundColor = "lightgray";
    }
    else {
        flagEnable = true;
        document.getElementById("btn-flag").style.backgroundColor = "darkgray";
    }
}

function clickTile() {
    let tile = this;
    if (flagEnable) {
        if (tile.innerText == "") {
            tile.innerText = "🚩";
        }
        else if (tile.innerText == "🚩") {
            tile.innerText = "";
        }
        return;
    }

    if (minesLocation.includes(tile.id)) {
        // alert("Game Over!!")
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split("-"); //"0-0" => ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}
function revealMines() {
    for (r = 0; r <= rows; r++) {
        for (c = 0; c <= columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";
            }
        }
    }
}
//     0     1     2
// 0 [0,0] [0,1] [0,2]
// 1 [1,0] [1,1] [1,2]
// 2 [2,0] [2,1] [2,2]
// 3 [3,0] [3,1] [3,2]
//
function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if(board[r][c].classList.contains("tile-clicked")){
        return;
    }
    board[r][c].classList.add("tile-clicked")
    board[r][c].style.backgroundColor = "gray";
    let minesFound = 0;
    //top3
    minesFound += checkTile(r - 1, c - 1);      //top left
    minesFound += checkTile(r - 1, c);          //top
    minesFound += checkTile(r - 1, c + 1);      //top right

    //left right and left
    minesFound += checkTile(r, c - 1)           //left
    minesFound += checkTile(r, c + 1)           //right

    //bottom 3
    minesFound += checkTile(r + 1, c - 1);      //bottom left
    minesFound += checkTile(r + 1, c);          //bottom
    minesFound += checkTile(r + 1, c + 1);      //bottom right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
    }
    else {
        checkMine(r - 1, c - 1);
        checkMine(r - 1, c);
        checkMine(r - 1, c + 1);

        checkMine(r, c - 1);
        checkMine(r, c + 1);

        checkMine(r + 1, c - 1);
        checkMine(r + 1, c);
        checkMine(r + 1, c + 1);
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}
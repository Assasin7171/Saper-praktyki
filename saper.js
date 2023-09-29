var rows = 10;
var columns = 10;
var board = [];

var minesCount = 10;
var minesLocation = [];

var titlesClicked = 0;
var flagEnable = false;

var gameOver = false;


window.onload = function () {
    startGame();
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("btn-flag").addEventListener("click", setFlag);

    for (r = 0; r <= rows; r++) {
        let row = []
        for (c = 0; c <= columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
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

}
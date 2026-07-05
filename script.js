const cells = document.querySelectorAll(".cell");

const status = document.getElementById("status");

const restartBtn = document.getElementById("restart");

const popup = document.getElementById("popup");

const result = document.getElementById("result");

const playAgain = document.getElementById("playAgain");

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "X";

let gameActive = true;

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

cells.forEach(cell => {

    cell.addEventListener("click", handleClick);

});

restartBtn.addEventListener("click", restartGame);

playAgain.addEventListener("click", restartGame);

function handleClick(){

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){

        return;

    }

    board[index] = currentPlayer;

    this.textContent = currentPlayer;

    checkWinner();

}

function checkWinner(){

    let roundWon = false;

    for(let pattern of winPatterns){

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if(board[a] === "" || board[b] === "" || board[c] === ""){

            continue;

        }

        if(board[a] === board[b] && board[b] === board[c]){

            roundWon = true;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            break;

        }

    }

    if(roundWon){

        status.textContent = "";

        result.innerHTML = `
        🎉<br><br>
        Player <span style="color:#2575FC">${currentPlayer}</span> Wins!
        `;

        popup.classList.add("show");

        gameActive = false;

        return;

    }

    if(!board.includes("")){

        status.textContent = "";

        result.innerHTML = `
        🤝<br><br>
        It's a Draw!
        `;

        popup.classList.add("show");

        gameActive = false;

        return;

    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    status.textContent = `Player ${currentPlayer} Turn`;

}

function restartGame(){

    board = [

        "", "", "",
        "", "", "",
        "", "", ""

    ];

    currentPlayer = "X";

    gameActive = true;

    status.textContent = "Player X Turn";

    popup.classList.remove("show");

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("win");

    });

}
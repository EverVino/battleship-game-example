import "./styles.css";
import { Player } from "./factories.js";

let currentState = {
    "playerTurn": null,
    "isOver": true
}

const humanGB = document.getElementById('humano');
const computerGB = document.getElementById('maquina');
const startBtn = document.getElementById("start-btn");
const suffleBtn = document.getElementById("suffle-btn");
const restartBtn = document.getElementById("restart-btn");
const gameStatus = document.getElementById("game-status");

startBtn.addEventListener("click", () => {
    if (currentState.playerTurn != null) {
        alert("There is a game in progress");
        return;
    }
    currentState.playerTurn = "human";
    currentState.isOver = false;
    gameStatus.textContent = "Your turn"
});

suffleBtn.addEventListener("click", () => {
    if (currentState.playerTurn != null) {
        alert("There is a game in progress");
        return;
    }
    gameStatus.textContent = ""
    human = Player();
    computer = Player();
    fillboard(humanGB, true, human.gameboard.board);
    fillboard(computerGB, false, computer.gameboard.board);
})

restartBtn.addEventListener("click", () => {
    currentState.playerTurn = null;
    currentState.isOver=true;
    human = Player();
    computer = Player();
    fillboard(humanGB, true, human.gameboard.board);
    fillboard(computerGB, false, computer.gameboard.board);
})


function cleanGameboards(container) {
    while (container.firstChild) {
        container.removeChild(container.lastChild)
    }
}

function fillboard(container, isPlayer=true, gameboard) {
    cleanGameboards(container);
    const typePlayer = isPlayer ? "human": "computer";
    for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++) {
            const cell = document.createElement("div");
            const cellId = `${typePlayer},${i},${j}`;
            const cellCode = gameboard[i][j];
            if (isPlayer && cellCode!=0) {
                cell.classList.add("cell-ship");
            }
            else {
                cell.classList.add("cell");
            }
            cell.setAttribute("id", cellId);
            if (!isPlayer) {
                cell.addEventListener("click", handleCellClick);
            }
            container.appendChild(cell)
        }
    }
}

let human = Player() 
let computer = Player()

fillboard(humanGB, true, human.gameboard.board);
fillboard(computerGB, false, computer.gameboard.board);

function getData(cellData) {
    const lst = cellData.split(",");
    return lst
}

function createMark(marker) {
    const symbol = marker =="x" ? "#x-mark": "#dot";
    const NS = "http://www.w3.org/2000/svg";
    const svgIcon = document.createElementNS(NS, "svg");
    svgIcon.classList.add("class", "icon");
    const useIcon = document.createElementNS(NS, "use");
    useIcon.setAttribute("href",symbol);
    svgIcon.appendChild(useIcon);
    return svgIcon;
}

function getComputerAttack(gameboard) {
    let x = Math.round(Math.random()*9);
    let y = Math.round(Math.random()*9);
    while (gameboard[x][y] < 0 || gameboard[x][y] == "x") {
        x = Math.round(Math.random()*9);
        y = Math.round(Math.random()*9);
    }
    return [x, y];
}

async function playComputer () {
    currentState.playerTurn = "computer";
    gameStatus.textContent = "Computer turn"
    await new Promise(resolve => setTimeout(resolve, 500));
    let gameboard = human.gameboard.board;
    const coordinates = getComputerAttack(gameboard);
    const isHitShip = human.gameboard.receiveAttack(coordinates);
    const cellId = `human,${coordinates[0]},${coordinates[1]}`;
    const cell = document.getElementById(cellId);
    if (isHitShip) {
        const mark = createMark("x");
        cell.appendChild(mark);
    }
    else {
        const mark = createMark("dot");
        cell.appendChild(mark)
    }
    if (human.gameboard.isLostGame()){
        gameStatus.textContent = "Computer won!"
        currentState.isOver = true;
        currentState.playerTurn = null;
        return 
    }
    currentState.playerTurn = "human";
    gameStatus.textContent = "Your turn";
}

function handleCellClick(event) {
    const cell = event.target;
    const [playerType, x, y] = getData(cell.id);
    if (currentState.playerTurn != "human" && playerType != "human") {
        return;
    }
    const coordinates = [parseInt(x), parseInt(y)];
    cell.removeEventListener("click", handleCellClick);

    let player = playerType=="human" ? human: computer;

    const isHitShip = player.gameboard.receiveAttack(coordinates);

    if (isHitShip) {
        const mark = createMark("x");
        cell.appendChild(mark);
    }
    else {
        const mark = createMark("dot");
        cell.appendChild(mark)
    }
    if (computer.gameboard.isLostGame()){
        gameStatus.textContent = "You won! Congrats"
        currentState.isOver = true;
        currentState.playerTurn = null;
        return 
    }
    
    playComputer();
}
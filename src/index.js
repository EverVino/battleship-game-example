import "./styles.css";
import { Player } from "./factories.js";

let currentState = {
    "playerTurn": null,
    "isOver": true
}

const humanGB = document.getElementById('humano');
const machineGB = document.getElementById('maquina');

function fillboard(container, isPlayer=true, gameboard) {
    const typePlayer = isPlayer ? "player": "computer";
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
            cell.addEventListener("click", handleCellClick);
            container.appendChild(cell)
        }
    }
}

let player = Player() 
let computer = Player()

fillboard(humanGB, true, player.gameboard.board);
fillboard(machineGB, false, computer.gameboard.board);

function getData(cellData) {
    const lst = cellData.split(",");
    return lst
}
function handleCellClick(event) {
    const cell = event.target;
    const [playerType, x, y] = getData(cell.id);

    const coordinates = [parseInt(x), parseInt(y)];

    console.log(playerType);

    console.log(`${x},${y}, ${typeof(parseInt(x))}`)

}
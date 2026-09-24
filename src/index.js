import "./styles.css";

const humanGB = document.getElementById('humano');
const machineGB = document.getElementById('maquina');
for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.col = j;
        cell.dataset.row = i;
        cell.addEventListener("click", handleCellClick);
        humanGB.appendChild(cell)

        const cellm = document.createElement("div");
        cellm.classList.add("cell");
        cellm.dataset.col = j;
        cellm.dataset.row = i;
        cellm.addEventListener("click", handleCellClick);
        machineGB.appendChild(cellm)
    }
}

function handleCellClick(event) {
    const target = event.target;
    console.log(`${target.dataset.row}, ${target.dataset.col}`)
}
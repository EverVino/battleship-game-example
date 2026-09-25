
const Ship = (key, size, coordinates) => {
    let len = size;
    let hitsTaken = 0;
    let position = coordinates;
    let name = key;

    function hit() {
        hitsTaken++;
    }

    function isSunk() {
        return hitsTaken >= len;
    }

    return { hit, isSunk, position, name }
}

const Gameboard = (size=10) => {
    let board = [];
    let defaultShips = {
        'carrier': 5,
        'battleship': 3,
        'cruiser': 3,
        'submarine': 3,
        'destroyer':2
    };
    let ships = [];

    for(let i=0; i<size; i++) {
        board[i] = [];
        for (let j=0;j<size;j++) {
            board[i][j] = 0;
        }
    }

    function getRandomCoor(size) {
        const vh = Math.round(Math.random());
        let x;
        let y;
        let lst = [];

        if (vh==1){
            x = Math.floor(Math.random()*(10));
            y = Math.floor(Math.random()*(10-size));
            for (let i=0; i<size; i++) {
                    lst.push([x,y+i]);
            }
        }
        else {
            x = Math.floor(Math.random()*(10-size));
            y = Math.floor(Math.random()*(10));
            for (let i=0; i<size; i++) {
                    lst.push([x+i,y]);
            }
        }
        return lst;
    }
    
    function isValidCoor(coordinates) {
        for (let coor of coordinates) {
            let [x, y] = coor;

            if (board[x][y]!=0){
                return false;
            }

            function filterNei(item) {
                if (item[0]>=size || item[0]<0) {
                    return false;
                }
                if (item[1]>=size || item[1]<0) {
                    return false;
                }
                return true;
            }

            let neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1],
                [x+1,y+1], [x-1,y+1], [x-1,y-1], [x+1,y-1]].filter(filterNei);

            for (let nei of neighbors) {
                let [x, y] = nei;
                if (board[x][y] != 0) {
                    return false;
                }
            } 
        }

        return true;
    }

    function fillGameboard(){
        for (let key in defaultShips) {
            let coordinates = getRandomCoor(defaultShips[key]);

            while (!isValidCoor(coordinates)) {
                coordinates = getRandomCoor(defaultShips[key]);
            }

            ships.push(Ship(key, defaultShips[key], coordinates));

            let n = ships.length;

            for (let coor of coordinates) {
                let [x, y] = coor;
                board[x][y] = n;
            }
            
        }
    }
    
    function receiveAttack(attackCoord){
        let [x, y] = attackCoord;
        if (board[x][y] != 0){
            const shipIdx = board[x][y] - 1;
            ships[shipIdx].hit()
            board[x][y] = 'x';
            return true;
        }
        else {
            board[x][y] = -1;
            return false;
        }
    }
    
    function isLostGame() {
        for (let ship of ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    return { fillGameboard, receiveAttack, isLostGame, board }

}

const Player = () => {
    const gameboard = Gameboard();
    gameboard.fillGameboard();
    return { gameboard }
}
export { Ship, Gameboard, Player };

import _ from 'lodash';

function make2Darray(row, col) {
    let arr = new Array(row);
    for (let i = 0; i < arr.length; i++) {
         arr[i] = new Array(col);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = '';
        }
    }
    return arr;
}

let missed = [];
let board = make2Darray(10, 10);
let CpuBoard = make2Darray(10, 10);
let ok;

export default class Gameboard {
    constructor(shipsArr, destroyer, submarine, cruiser, battleship, carrier) {
        this.shipsArr = shipsArr;
        this.destroyer = destroyer;
        this.submarine = submarine;
        this.cruiser = cruiser;
        this.battleship = battleship;
        this.carrier = carrier;
    }

    placeCpuShips() {
        const boardSize = 10;
        this.shipsArr.forEach((ship) => {
            let isShipPlaced = false;
            while(!isShipPlaced) {
                const isHorizontal = Math.random() < 0.5;
                const row = Math.floor(Math.random() * boardSize);
                const col = Math.floor(Math.random() * boardSize);
                if (this.canPlaceShip(CpuBoard, row, col, ship, isHorizontal)) {
                    this.placeCpuShip(CpuBoard, row, col, ship, isHorizontal)
                    isShipPlaced = true;
                }
            }
        });
        return CpuBoard;  
    }

    canPlaceShip(board, row, col, length, isHorizontal) {
        if(isHorizontal) {
            if(col + length.length > 10) {
                return false;
            }
            for (let i = col; i < col + length.length; i++) {
                if(board[row][i] !== '') {
                    return false;
                }
            } 
        } else {
            if(row + length.length > 10) {
                return false;
            }
            for(let i = row; i < row + length.length; i++) {
                if(board[i][col] !== '') {
                    return false;
                }
            }
        }
        return true;
    }

    placeCpuShip(board, row, col, length, isHorizontal) {
            if(isHorizontal) {
                for(let i = col; i < col + length.length; i++) {
                    board[row][i] = length;
                }
            } else {
                for(let i = row; i < row + length.length; i++) {
                    board[i][col] = length;
                }
            }
    }

    placeShip() {
        return board;
    }

    canPlaceShipPlayer(board, j, i, ship, angle) {
        if(angle === 'column') {
            if(i + ship.length > 9) {
                return false;
            }
            for(let l = i; l < i + ship.length; l++) {
                if(board[l][j] !== '') {
                    return false;
                }
            }
        } else {
            if(j + ship.length > 9) {
                return false;
            }
            for(let l = j; l < j + ship.length; l++) {
                if(board[i][l] !== '') {
                    return false;
                }
            }
        }
        return true;
    }

    placeDroppedShip(ship, index, angle) {
        console.log(index);
        let counter = 0;
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board.length; j++) {
                counter++;
                if(counter === index) {
                    
                    for(let k = 0; k < this.shipsArr.length; k++) {
                        if(ship === this.shipsArr[k].name) {
                            console.log(i,j,this.shipsArr[k].length);
                            if(this.canPlaceShipPlayer(board, j, i, this.shipsArr[k], angle)) {
                                board[i][j] = this.shipsArr[k];
                                if(angle === 'row') {
                                    console.log(`row:${this.shipsArr[k]},${board[i][j]}`)
                                    for (let l = 0; l < this.shipsArr[k].length; l++) {
                                        board[i][j++] = this.shipsArr[k];
                                        
                                    }
                                } else {
                                    console.log(this.shipsArr[k],board[i][j])
                                    for(let m = 0; m < this.shipsArr[k].length; m++) {
                                        board[i++][j] = this.shipsArr[k];
                                        
                                    }
                                }
                                ok = 1;
                            } else {
                                alert('cant place ship there u donkey');
                                ok = 2;
                                return { board, ok};
                            }
                            
                        }
                    }
                }
            }
        }
        return { board, ok };
    }

    receiveAttackCpu([x, y], board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[x][y] !== '') {
                    for (let i = 0; i < this.shipsArr.length; i++) {
                        if (board[x][y].name === this.shipsArr[i].name) {
                            this.shipsArr[i].hit();
                            let check = this.shipsArr[i].isSunk();
                            if (check === 1) {
                                alert('U SUNK THAT GOOF OPPS SHIP!');
                            }
                            let allSunkCheck = this.allSunk();
                            if(allSunkCheck === 5) {
                               return alert('congrats you won');
                            }
                            return;
                        }
                    }
                } else {
                    missed.push(board[x][y]);
                }
                
            }
        }
        return missed;
    }
    receiveAttack([x, y]) {
        let board = this.placeShip();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[x][y] !== undefined) {
                    for (let i = 0; i < this.shipsArr.length; i++) {
                        if (board[x][y].name === this.shipsArr[i].name) {
                            this.shipsArr[i].hit();
                            let check = this.shipsArr[i].isSunk();
                            if (check === 1) {
                                alert('U SUNK THAT GOOF OPPS SHIP!');
                            }
                            return this.shipsArr[i].name;
                        }
                    }
                } else {
                    missed.push(board[x][y]);
                }
                
            }
        }
        return missed;
    }

    allSunk() {
        let sunken = [];
        for (let i = 0; i < this.shipsArr.length; i++) {
                if (this.shipsArr[i].isSunk()) {
                sunken.push(this.shipsArr[i]);
            }
        }
        return sunken.length;
    }
}

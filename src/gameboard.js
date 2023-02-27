import _ from 'lodash';
import Ship from './ships.js';
import './styles.css';

const destroyer = new Ship('destroyer', 4, 0);
const submarine = new Ship('submarine', 3, 0);
const cruiser = new Ship('cruiser', 3, 0);
const battleship = new Ship('battleship', 4, 0);
const carrier = new Ship('carrier', 5, 0);
const shipsArr = [destroyer, submarine, cruiser, battleship, carrier];

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
const board = make2Darray(10, 10);

export default class Gameboard {
    constructor() {
        
    }
    placeShip() {
        for (let i = 0; i < destroyer.length; i++) {
            board[0][i] = destroyer;
        }
        for (let i = 0; i < submarine.length; i++) {
            board[2][i] = submarine;
        }
        for (let i = 0; i < cruiser.length; i++) {
            board[4][i] = cruiser;
        }
        for (let i = 0; i < battleship.length; i++) {
            board[6][i] = battleship;
        }
        for (let i = 0; i < carrier.length; i++) {
            board[8][i] = carrier;
        }
        return board;
    }
    receiveAttack([x, y]) {
        let board = this.placeShip();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[x][y] !== undefined) {
                    for (let i = 0; i < shipsArr.length; i++) {
                        if (board[x][y].name === shipsArr[i].name) {
                            shipsArr[i].hit();
                            let check = shipsArr[i].isSunk();
                            if (check === 1) {
                                console.log('u sunk this bitch');
                            }
                            return shipsArr[i].name;
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
        for (let i = 0; i < shipsArr.length; i++) {
                if (shipsArr[i].isSunk()) {
                sunken.push(shipsArr[i]);
            }
        }
        return sunken.length;
    }
}

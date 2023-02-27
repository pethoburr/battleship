import _ from 'lodash';
import Gameboard from './gameboard';
import { Player } from './player';
import './styles.css';


const contentEl = document.getElementById('content');

function makeCPUBoard() {
    const board = document.createElement('div');
    board.id = 'board';
    const gameBoard = new Gameboard();
    const boards = gameBoard.placeShip();
    for (let i = 0; i < boards.length; i++) {
        for (let j = 0; j < boards[i].length; j++) {
            const cell = document.createElement('div');
            cell.id = 'cpuBoard';
            board.appendChild(cell);
            cell.addEventListener('click', () => {
                playGame([i,j], gameBoard, cell, boards[i][j]);
                cell.classList.add('clicked');
            })
        }
    }
    contentEl.append(board)
}

function makeBoard() {
    const board = document.createElement('div');
    board.id = 'board';
    const gameBoard = new Gameboard();
    const boards = gameBoard.placeShip();
    for (let i = 0; i < boards.length; i++) {
        for (let j = 0; j < boards[i].length; j++) {
            const cell = document.createElement('div');
            if (boards[i][j] !== '') {
                cell.id = 'ship';
            } else {
                cell.id = 'water';
            }
            board.appendChild(cell);
        }
    }
    contentEl.append(board);
    return { board, boards, gameBoard };
}

function playGame(coord, board, cell, arrayBoard) {
    let missed = board.receiveAttack(coord);
    const playa = new Player();
    let shot = playa.cpuAttack();
    console.log('shot:' + shot);
    console.log('arrayBoard:' + arrayBoard);
    console.log('missed:' + missed);
    let sunkOrNa = board.allSunk();
    if (sunkOrNa === 5) {
        alert('GAME OVER BITCH');
    } else {
        if (arrayBoard !== '') {
            cell.id = 'hit';
        } else {
            cell.id = 'miss';
        } 
    }
    let playersSinkCheck = playerBoard.gameBoard.allSunk();
    let counter = 0;
    if (playersSinkCheck === 5) {
        alert('HAHAH u lost u fuckin head');
    } else {
        for (let i = 0; i < playerBoard.boards.length; i++) {
            for (let j = 0; j < playerBoard.boards[i].length; j++) {
                counter++;
                if (i === shot[0] && j === shot[1]) {
                    const cell = playerBoard.board.children[counter];
                    if (cell.id === 'ship') {
                        cell.id = 'hit';
                    } else {
                        cell.id = 'miss';
                    }
                    
                }
            }
        }
    }
}

let playerBoard = makeBoard();
makeCPUBoard();
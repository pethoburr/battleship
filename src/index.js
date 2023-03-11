import _ from 'lodash';
import Gameboard from './gameboard';
import Ship from './ships';
import { Player } from './player';
import './styles.css';

const contentEl = document.getElementById('content');
let angle = 'column';

function makeCPUBoard() {
    const board = document.createElement('div');
    board.id = 'board';
    const destroyer = new Ship('destroyer', 4, 0);
    const submarine = new Ship('submarine', 3, 0);
    const cruiser = new Ship('cruiser', 3, 0);
    const battleship = new Ship('battleship', 4, 0);
    const carrier = new Ship('carrier', 5, 0);
    const shipsArr = [destroyer, submarine, cruiser, battleship, carrier];
    const gameBoard = new Gameboard(shipsArr, destroyer, submarine, cruiser, battleship,  carrier);
    let boards = gameBoard.placeCpuShips();
    for (let i = 0; i < boards.length; i++) {
        for (let j = 0; j < boards[i].length; j++) {
            const cell = document.createElement('div');
            cell.id = 'cpuBoard';
            board.appendChild(cell);
            cell.addEventListener('click', () => {
                playGame([i,j], gameBoard, cell, boards[i][j], boards);
                cell.classList.add('clicked');
            })
        }
    }
    contentEl.append(board)
}

let boards;

function makeBoard() {
    const board = document.createElement('div');
    board.id = 'board';
    const destroyer = new Ship('destroyer', 4, 0);
    const submarine = new Ship('submarine', 3, 0);
    const cruiser = new Ship('cruiser', 3, 0);
    const battleship = new Ship('battleship', 4, 0);
    const carrier = new Ship('carrier', 5, 0);
    const shipsArr = [destroyer, submarine, cruiser, battleship, carrier];
    const gameBoard = new Gameboard(shipsArr, destroyer, submarine, cruiser, battleship,  carrier);
    const destroyerContainer = document.createElement('div');
    destroyerContainer.id = 'destroyer';
    for (let i = 0; i < destroyer.length; i++) {
        const destroyerCell = document.createElement('div');
        destroyerCell.id = 'select';
        destroyerContainer.appendChild(destroyerCell);
    }
    destroyerContainer.setAttribute('draggable', 'true');
    destroyerContainer.addEventListener('dragstart', dragStart);
    const submarineContainer = document.createElement('div');
    submarineContainer.id = 'submarine';
    for (let i = 0; i < submarine.length; i++) {
        const submarineCell = document.createElement('div');
        submarineCell.id = 'select';
        submarineContainer.appendChild(submarineCell);
    }
    submarineContainer.setAttribute('draggable', 'true');
    submarineContainer.addEventListener('dragstart', dragStart);
    const cruiserContainer = document.createElement('div');
    cruiserContainer.id = 'cruiser';
    for (let i = 0; i < cruiser.length; i++) {
        const cruiserCell = document.createElement('div');
        cruiserCell.id = 'select';
        cruiserContainer.appendChild(cruiserCell);
    }
    cruiserContainer.setAttribute('draggable', 'true');
    cruiserContainer.addEventListener('dragstart', dragStart);
    const battleshipContainer = document.createElement('div');
    battleshipContainer.id = 'battleship';
    for (let i = 0; i < battleship.length; i++) {
        const battleshipCell = document.createElement('div');
        battleshipCell.id = 'select';
        battleshipContainer.appendChild(battleshipCell);
    }
    battleshipContainer.setAttribute('draggable', 'true');
    battleshipContainer.addEventListener('dragstart', dragStart);
    const carrierContainer = document.createElement('div');
    carrierContainer.id = 'carrier';
    for (let i = 0; i < carrier.length; i++) {
        const carrierCell = document.createElement('div');
        carrierCell.id = 'select';
        carrierContainer.appendChild(carrierCell);
    }
    carrierContainer.setAttribute('draggable', 'true');
    carrierContainer.addEventListener('dragstart', dragStart);
    const shipContainer = document.createElement('div');
    shipContainer.id = 'shipContainer';
    shipContainer.appendChild(destroyerContainer);
    shipContainer.appendChild(submarineContainer);
    shipContainer.appendChild(cruiserContainer);
    shipContainer.appendChild(battleshipContainer);
    shipContainer.appendChild(carrierContainer);
    const flipBtn = document.createElement('button');
    flipBtn.textContent = 'flip';
    flipBtn.addEventListener('click', () => {
        const optionShips = Array.from(shipContainer.children);
        angle = angle === 'row' ? 'column' : 'row';
        optionShips.forEach(optionShip => optionShip.style.flexDirection = `${angle}`);
    });
    const optionShips = Array.from(shipContainer.children);
    optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart))
    contentEl.append(shipContainer);
    contentEl.append(flipBtn);
    boards = gameBoard.placeShip();
    for (let i = 0; i < boards.length; i++) {
        for (let j = 0; j < boards[i].length; j++) {
            const cell = document.createElement('div');
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('drop', dragDrop);
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

function playGame(coord, board, cell, arrayBoard, boards) {
    const playa = new Player();
    let shot = playa.cpuAttack();
    let cpuMissed = board.receiveAttackCpu(coord, boards);
    let missed = playerBoard.gameBoard.receiveAttack(shot);
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

let beingDragged;

function dragStart(e) {
    console.log(e.target);
    beingDragged = e.target;
}

function dragDrop(e) {
    console.log(e.target);
    console.log(beingDragged.id);
    e.target.id = beingDragged.id;
    let counter = 0;
    const cell = playerBoard.board.children;
    for (let i = 0; i < cell.length; i++) {
        if (cell[i].id === beingDragged.id) {
            boards = playerBoard.gameBoard.placeDroppedShip(beingDragged.id, i, angle);
            console.log(`playerboard: ${playerBoard.boards}`);
        }
        
    }
    
    for (let i = 0; i < boards.length; i++) {
        for (let j = 0; j < boards[i].length; j++) {
            counter++;
            if (boards[i][j] !== '') {
                const cell = playerBoard.board.children[counter];
                cell.id = 'ship';
            } else {
                cell.id = 'water';
            }
        }
    }
    beingDragged.remove();
}

function dragOver(e) {
    e.preventDefault();
}


let playerBoard = makeBoard();
makeCPUBoard();
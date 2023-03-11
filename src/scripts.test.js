import _, { before } from "lodash";
import Ship from './ships';
import Gameboard from '././gameboard.js';
import Plyer, { Player } from '././player.js';

describe('Ship', () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(4,4,2)
        ship.hit();
        ship.hit();
    })

    it('sinks', () => {
        expect(ship.isSunk()).toBe(1)
    })
})

describe('gameboard', () => {
    let board;
    beforeEach(() => {
           const destroyer = new Ship('destroyer', 4, 0);
    const submarine = new Ship('submarine', 3, 0);
    const cruiser = new Ship('cruiser', 3, 0);
    const battleship = new Ship('battleship', 4, 0);
    const carrier = new Ship('carrier', 5, 0);
    const shipsArr = [destroyer, submarine, cruiser, battleship, carrier];
    board = new Gameboard(shipsArr, destroyer, submarine, cruiser, battleship,  carrier);
    })

    it ('places ships(check error array instead of typing out whole array)', () => {
        expect(board.placeShip()).toBe(['fuck'])
    })

    it ('places CPU ships randomly', () => {
        expect(
            board.placeCpuShips()).toBe(['check error array']
            )
    })

    it ('recieves attack', () => {
        expect(board.receiveAttack(0,0)).toBe('destroyer')
    })

    it ('all sink', () => {
        board.receiveAttack(0,0)
        board.receiveAttack(0,1)
        board.receiveAttack(0,2)
        board.receiveAttack(0,3)
        board.receiveAttack(2,0)
        board.receiveAttack(2,1)
        board.receiveAttack(2,2)
        board.receiveAttack(4,0)
        board.receiveAttack(4,1)
        board.receiveAttack(4,2)
        board.receiveAttack(6,0)
        board.receiveAttack(6,1)
        board.receiveAttack(6,2)
        board.receiveAttack(6,3)
        board.receiveAttack(8,0)
        board.receiveAttack(8,1)
        board.receiveAttack(8,2)
        board.receiveAttack(8,3)
        board.receiveAttack(8,4)
        expect(board.allSunk()).toBe(5)
    })
})

describe('Player', () => {
    let player;
    beforeEach(() => {
        player = new Player();
    })

    it('doesnt shoot missed, or hit, or same shot ever again', () => {
        expect(player.cpuAttack()).toBe([0,1])
    })
})
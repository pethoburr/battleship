import _ from 'lodash';
import Gameboard from './gameboard';

let prev = [];

export class Player {
    constructor() {
    }

    attack(coords) {
        return coords;
    }

    cpuAttack() {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        while (prev.includes(`${x},${y}`)) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }
        prev.push(`${x},${y}`);
        return [x, y];
    }
}

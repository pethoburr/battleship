import _ from 'lodash';
import Gameboard from './gameboard';

export class Player {
    constructor() {
    }

    attack(coords) {
        return coords;
    }

    cpuAttack() {
        let missedArr = [[null,null]];
        let cpu = [];
        let ranX = Math.floor(Math.random() * 9);
        let ranY = Math.floor(Math.random() * 9);
        for (let i = 0; i < missedArr.length; i++) {
            if (missedArr[i][0] !== ranX && missedArr[i][1] !== ranY) {
                cpu.push(ranX);
                cpu.push(ranY);
            } else {
                ranX = Math.floor(Math.random() * 9);
                ranY = Math.floor(Math.random() * 9);
            }
        }
        let ans = [];
        ans.push(cpu[0]);
        ans.push(cpu[1]);
        missedArr.push(ans);
        return ans;
    }
}

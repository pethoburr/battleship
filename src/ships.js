import _ from 'lodash';

export default class Ship {
    constructor(name, length, hits = 1) {
        this.name = name;
        this.length = length;
        this.hits = hits;
    }

    hit() {
        if (this.length !== this.hits) {
            this.hits++;
        }
    }

    isSunk() {
        if (this.length === this.hits) {
            return 1;
        } 
    }
}


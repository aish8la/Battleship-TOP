export class Ship {
    constructor(length) {
        this.length = length;
    }
    hitsTaken = 0;
    hit() {
        this.hitsTaken++;
    }
}
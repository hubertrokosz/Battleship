class Ship {
    constructor(length) {
        this.length = length;
        this.hitCount = 0;
        this.sunk = false;
    }

    hit() {
        this.hitCount++;
    }

    isSunk() {
        if (this.length === this.hitCount) {
            this.sunk = true;
        }
    }
}

class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.grid = this.createEmptyGrid();
    }

    createEmptyGrid() {
        let grid = [];
        for (let row = 0; row < this.size; row++) {
            let rowArray = [];
            for(let col = 0; col < this.size; col++) {
                rowArray.push(null);
            }
            grid.push(rowArray);
        }
        return grid;
    }

    placeShip(x, y, ship) {
        let xCord = x;
        let yCord = y;
        for (let i = 0; i < ship.length; i++) {
            this.grid[x][y] = ship;
            y++;
        }
    }

    receiveAttack(x, y) {
        if (this.grid[x][y] !== null) {
            this.grid[x][y].hit();
        }
        else if (this.grid[x][y] === null) {
            this.grid[x][y] = "x";
        }
    }
}

class Player {
    constructor(name, board) {
        this.name = name;
        this.board = new Gameboard();
    }
}

export { Gameboard, Ship, Player }
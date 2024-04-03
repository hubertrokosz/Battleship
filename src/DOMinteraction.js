import { Ship, Gameboard, Player, player1, player2 } from './classes';

function createDOM() { 
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);

    player1.board.placeShip(1, 3, ship1);
    player1.board.placeShip(4, 6, ship2);
    console.log(player1);
    console.log(player2);

    const gridContainer1 = document.getElementById('grid-container1');

    player1.board.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.id = `cell1-${rowIndex}-${colIndex}`;
            cellDiv.setAttribute('data-row', rowIndex);
            cellDiv.setAttribute('data-col', colIndex);
            gridContainer1.appendChild(cellDiv);
        });
    });

    player2.board.placeShip(8, 3, ship1);
    player2.board.placeShip(4, 0, ship2);

    const gridContainer2 = document.getElementById('grid-container2');

    player2.board.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.id = `cell2-${rowIndex}-${colIndex}`;
            cellDiv.setAttribute('data-row', rowIndex);
            cellDiv.setAttribute('data-col', colIndex);
            gridContainer2.appendChild(cellDiv);
        });
    });

    renderBoard();
}

function renderBoard() {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cellId = `cell1-${row}-${col}`;
            const cellDiv = document.getElementById(cellId);
            if (typeof player1.board.grid[row][col] === 'object') {
                cellDiv.textContent = null;
            }
            else {
                cellDiv.textContent = player1.board.grid[row][col];
            }
        }
    }

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cellId = `cell2-${row}-${col}`;
            const cellDiv = document.getElementById(cellId);
            cellDiv.textContent = player2.board.grid[row][col];
        }
    }
}

function attack() {
    const container1 = document.querySelector("#grid-container1");
    
    container1.addEventListener('click', function(event) {
        if (player1.turn === true && event.target.tagName === 'DIV' && !event.target.classList.contains('inactive')) {
            let row = event.target.dataset.row;
            let col = event.target.dataset.col;
            if (row === undefined || col === undefined) {
                return;
            }
            if (player1.board.grid[row][col] === null){
                player1.board.grid[row][col] = "x";
                event.target.classList.add('inactive');
                player1.turn = false;
                player2.turn = true;
                
                computerAttack();
            }
            else {
                player1.board.grid[row][col].hit();
                event.target.classList.add('inactive');
                event.target.classList.add('hit');
            }
            renderBoard();
        }
    });
}

function computerAttack() {
    if (player2.turn === true) {
        const coords = computerCoords(player1.board.grid);
        setTimeout(() => {
            console.log(coords().coords);
            player2.board.grid[coords().coords[0]][coords().coords[1]] = 'x';
            renderBoard();
            player2.turn = false;
            player1.turn = true;
        }, 1000);
    }
}

function computerCoords(array) {
    let flatArray = [];
    array.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            flatArray.push({value, coords: [rowIndex, colIndex]});
        });
    });

    return function pick() {
        if (flatArray.length === 0) {
            return null;
        }

        const index = Math.floor(Math.random() * flatArray.length);

        const pickedElement = flatArray[index];

        flatArray.splice(index, 1);

        return pickedElement;
    };
}

export { createDOM, attack, computerAttack }
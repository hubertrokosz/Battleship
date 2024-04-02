import { Ship, Gameboard, Player, player1, player2 } from './classes';

function createDOM() { 
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);

    player1.board.placeShip(1, 3, ship1);
    player1.board.placeShip(4, 6, ship2);
    console.log(player1);

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
            cellDiv.textContent = player1.board.grid[row][col];
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
    const container2 = document.querySelector("#grid-container2");

    container1.addEventListener('click', function(event) {
        if (event.target.tagName === 'DIV') {
            let row = event.target.dataset.row;
            let col = event.target.dataset.col;
            player1.board.grid[row][col] = "x";
            renderBoard();
        }
    });

    container2.addEventListener('click', function(event) {
        if (event.target.tagName === 'DIV') {
            let row = event.target.dataset.row;
            let col = event.target.dataset.col;
            player2.board.grid[row][col] = "x";
            renderBoard();
        }
    });
}

export { createDOM, attack }
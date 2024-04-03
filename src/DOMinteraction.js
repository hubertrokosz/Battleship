import { Ship, Gameboard, Player, player1, player2 } from './classes';

function createDOM() { 
    const p1Ship1 = new Ship(2);
    const p1Ship2 = new Ship(3);
    const p1Ship3 = new Ship(4);

    player1.board.placeShip(1, 3, p1Ship1);
    player1.board.placeShip(4, 6, p1Ship2);
    player1.board.placeShip(0, 0, p1Ship3);

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

    const p2Ship1 = new Ship(2);
    const p2Ship2 = new Ship(3);
    const p2Ship3 = new Ship(4);
    const p2Ship4 = new Ship(2);
    const p2Ship5 = new Ship(3);
    const p2Ship6 = new Ship(4);
    const p2Ship7 = new Ship(4);
    const p2Ship8 = new Ship(4);


    player2.board.placeShip(8, 3, p2Ship1);
    player2.board.placeShip(4, 0, p2Ship2);
    player2.board.placeShip(0, 0, p2Ship3);
    player2.board.placeShip(2, 6, p2Ship4);
    player2.board.placeShip(5, 6, p2Ship5);
    player2.board.placeShip(6, 1, p2Ship6);
    player2.board.placeShip(2, 0, p2Ship7);
    player2.board.placeShip(9, 6, p2Ship8);

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
            if (player1.board.grid[row][col] instanceof Ship) {
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
            if (player2.board.grid[row][col] instanceof Ship) {
                cellDiv.classList.add('ship');
                cellDiv.textContent = null;    
            }
            else {
                cellDiv.textContent = player2.board.grid[row][col];
            }
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
        setTimeout(() => {
            const coords = computerCoords(player1.board.grid)();
            console.log(coords.coords);
            if (player2.board.grid[coords.coords[0]][coords.coords[1]] instanceof Ship) {
                player2.board.grid[coords.coords[0]][coords.coords[1]].hit();
                const div = document.getElementById(`cell2-${coords.coords[0]}-${coords.coords[1]}`);
                div.classList.remove('ship');
                div.classList.add('hit');
                renderBoard();
                computerAttack();
            }
            else {
                player2.board.grid[coords.coords[0]][coords.coords[1]] = 'x';
                renderBoard();
                player2.turn = false;
                player1.turn = true;
            }
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
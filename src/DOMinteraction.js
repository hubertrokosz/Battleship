import { Ship, Gameboard, Player } from './classes';

function createDOM() { 
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);

    const player1 = new Player("Hubert");
    player1.board.placeShip(1, 3, ship1);
    player1.board.placeShip(4, 6, ship2);
    console.log(player1);

    const gridContainer1 = document.getElementById('grid-container1');

    player1.board.grid.forEach(row => {
        row.forEach(cell => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent = cell;
            gridContainer1.appendChild(cellDiv);
        });
    });

    const player2 = new Player('AI');
    player2.board.placeShip(8, 3, ship1);
    player2.board.placeShip(4, 0, ship2);

    const gridContainer2 = document.getElementById('grid-container2');

    player2.board.grid.forEach(row => {
        row.forEach(cell => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent = cell;
            gridContainer2.appendChild(cellDiv);
        });
    });

}

function renderBoard() {
    
}

export { createDOM }
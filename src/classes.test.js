const { Gameboard, Ship, Player } = require('./classes');

describe('Ship', () => {
    let ship;
  
    beforeEach(() => {
      ship = new Ship(4);
    });
  
    test('ship length', () => {
      expect(ship.length).toBe(4);
    });
  });
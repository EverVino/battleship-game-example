import { Ship, Gameboard } from "./src/factories.js";

test("Test ship", () => {
    const ship = Ship("normal", 3, [[0,0], [0,1], [0,2]] );
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})

test("Create gameboard", () => {
    const gameboard = Gameboard();
    gameboard.fillGameboard();
    let counter = 0;
    for(let i=0; i<10;i++) {
        for(let j=0; j<10; j++) {
            let cell = gameboard.board[i][j];
            if (cell!=0) {
                counter++;
            }
        }
    }

    expect(counter).toBe(16);
}) 

// TODO: Implement check neigbors test

// Keeping this for reference
//test("Test Capitalize", () => {
//    expect(capitalize("hello")).toBe("Hello");
//})
//
//test("Test reverse string", () => {
//    expect(reverseString("hello")).toBe("olleh")
//})
//
//test("Test calculator", () => {
//    calc = calculator()
//    expect(calc.add(2,3)).toBe(5);
//    expect(calc.substract(2,3)).toBe(-1);
//    expect(calc.multiply(2,3)).toBe(6);
//    expect(calc.divide(10,3)).toBeCloseTo(3.333);
//})
//
//test("Test caesarCipher", () => {
//    expect(caesarCipher("xyz", 3)).toBe("abc");
//    expect(caesarCipher("Hello World!", 3)).toBe("Khoor Zruog!");
//    expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
//})
//
//test("Test analizer", () => {
//    const expected = {
//        average: 4,
//        min: 1,
//        max:8,
//        length: 6
//    }
//    const input = [1,8,3,4,2,6];
//    expect(analyzeArray(input)).toEqual(expected);
//})
//

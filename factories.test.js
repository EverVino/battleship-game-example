import { Ship } from "./src/factories.js";

test("Test ship", () => {
    const ship = Ship(3);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})

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

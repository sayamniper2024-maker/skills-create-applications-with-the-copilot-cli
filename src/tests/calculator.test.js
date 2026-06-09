const { parseNumbers, add, sub, mul, div, modulo, power, squareRoot } = require('../calculator');

describe('Calculator functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add([2, 3])).toBe(5);
  });

  test('addition with multiple operands: 1 + 2 + 3 = 6', () => {
    expect(add([1, 2, 3])).toBe(6);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(sub([10, 4])).toBe(6);
  });

  test('subtraction left-to-right: 10 - 4 - 1 = 5', () => {
    expect(sub([10, 4, 1])).toBe(5);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(mul([45, 2])).toBe(90);
  });

  test('multiplication with floats: 3 * 2.5 = 7.5', () => {
    expect(mul([3, 2.5])).toBeCloseTo(7.5);
  });

  test('division: 20 / 5 = 4', () => {
    expect(div([20, 5])).toBe(4);
  });

  test('division left-to-right: 100 / 2 / 5 = 10', () => {
    expect(div([100, 2, 5])).toBe(10);
  });

  test('division by zero throws', () => {
    expect(() => div([10, 0])).toThrow(/Division by zero/);
  });

  // New tests for extended operations
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo([5, 2])).toBe(1);
  });

  test('modulo with floats: 5.5 % 2 = 1.5', () => {
    expect(modulo([5.5, 2])).toBeCloseTo(1.5);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo([5, 0])).toThrow(/Modulo by zero/);
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power([2, 3])).toBe(8);
  });

  test('power chaining: 2 ^ 3 ^ 2 = (2^3)^2 = 64', () => {
    expect(power([2, 3, 2])).toBe(64);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot of negative number throws', () => {
    expect(() => squareRoot(-4)).toThrow(/Square root of negative number/);
  });

  test('parseNumbers: rejects non-number', () => {
    const { error } = parseNumbers(['1', 'x']);
    expect(error).toMatch(/Invalid number/);
  });

  test('parseNumbers: needs at least two operands', () => {
    const { error } = parseNumbers(['1']);
    expect(error).toMatch(/Need at least two/);
  });
});

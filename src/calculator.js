#!/usr/bin/env node
"use strict";

/**
 * CLI Calculator (calculator.js)
 * Supported operations:
 *  - addition (add, +)
 *  - subtraction (sub, -)
 *  - multiplication (mul, *)
 *  - division (div, /)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js + 1 2 3
 *   node src/calculator.js div 10 2
 *
 * Exits with code 0 on success, non-zero on error.
 */

const USAGE = `Usage: calculator.js <operation> <num1> <num2> [num3 ...]

Operations:
  add, +      Addition
  sub, -      Subtraction (left-to-right)
  mul, *      Multiplication
  div, /      Division (left-to-right, division by zero is an error)

Examples:
  node src/calculator.js add 2 3        # 5
  node src/calculator.js sub 10 4 1     # 5
  node src/calculator.js mul 3 2.5      # 7.5
  node src/calculator.js div 10 2       # 5
`;

function parseNumbers(args, min = 2) {
  if (!args || args.length < min) return { error: `Need at least ${min} numeric operands.` };
  const nums = [];
  for (const a of args) {
    const n = Number(a);
    if (!Number.isFinite(n)) return { error: `Invalid number: ${a}` };
    nums.push(n);
  }
  return { nums };
}

function add(nums) {
  return nums.reduce((s, v) => s + v, 0);
}

function sub(nums) {
  return nums.slice(1).reduce((s, v) => s - v, nums[0]);
}

function mul(nums) {
  return nums.reduce((s, v) => s * v, 1);
}

function div(nums) {
  return nums.slice(1).reduce((s, v) => {
    if (v === 0) throw new Error('Division by zero');
    return s / v;
  }, nums[0]);
}

// New functions requested:
function modulo(nums) {
  if (!nums || nums.length < 2) throw new Error('Modulo requires two operands');
  if (nums[1] === 0) throw new Error('Modulo by zero');
  return nums[0] % nums[1];
}

function power(nums) {
  if (!nums || nums.length < 2) throw new Error('Power requires two operands');
  // Apply left-to-right power chaining (e.g., ((a^b)^c) if more than 2 operands provided)
  return nums.slice(1).reduce((s, v) => Math.pow(s, v), nums[0]);
}

function squareRoot(n) {
  if (typeof n !== 'number') throw new Error('Invalid number for square root');
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
}

function printHelpAndExit(code = 0) {
  console.log(USAGE);
  process.exit(code);
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    printHelpAndExit(1);
  }

  const op = argv[0];
  if (op === '-h' || op === '--help' || op === 'help') {
    printHelpAndExit(0);
  }

  const operands = argv.slice(1);

  // Choose minimum operand count per operation
  const needsOneOperand = ['sqrt', '√'];
  const minOperands = needsOneOperand.includes(op) ? 1 : 2;
  const { nums, error } = parseNumbers(operands, minOperands);
  if (error) {
    console.error('Error:', error);
    printHelpAndExit(2);
  }

  try {
    let result;
    switch (op) {
      case 'add':
      case '+':
        result = add(nums);
        break;
      case 'sub':
      case '-':
        result = sub(nums);
        break;
      case 'mul':
      case '*':
        result = mul(nums);
        break;
      case 'div':
      case '/':
        if (nums.slice(1).some(n => n === 0)) {
          throw new Error('Division by zero');
        }
        result = div(nums);
        break;
      case 'mod':
      case '%':
        result = modulo(nums);
        break;
      case 'pow':
      case '^':
        result = power(nums);
        break;
      case 'sqrt':
      case '√':
        // nums contains a single numeric operand
        result = squareRoot(nums[0]);
        break;
      default:
        console.error(`Unknown operation: ${op}`);
        printHelpAndExit(3);
    }

    const out = Number.isInteger(result) ? String(result) : String(result);
    console.log(out);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err.toString());
    process.exit(4);
  }
}

if (require.main === module) main();

// Export functions for unit testing
module.exports = {
  parseNumbers,
  add,
  sub,
  mul,
  div,
  modulo,
  power,
  squareRoot,
  main,
};


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

function parseNumbers(args) {
  if (!args || args.length < 2) return { error: 'Need at least two numeric operands.' };
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
  const { nums, error } = parseNumbers(operands);
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
        // check division by zero early
        if (nums.slice(1).some(n => n === 0)) {
          throw new Error('Division by zero');
        }
        result = div(nums);
        break;
      default:
        console.error(`Unknown operation: ${op}`);
        printHelpAndExit(3);
    }

    // Print result with full precision when needed, but trim trailing zeros
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
  main,
};

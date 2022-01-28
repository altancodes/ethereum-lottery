const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Gets the path for the solidity contract
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

// Reads the source codes
const source = fs.readFileSync(lotteryPath, 'utf8');

// Compile the solidity code
module.exports = solc.compile(source, 1).contracts[':Lottery']; // just return assembly, bytecode, and interface


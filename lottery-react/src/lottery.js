import web3 from './web3';

// Stores the address for the contract address
const address = "0x09fa131DE209F4405dCB6A614B79a72Db06f8670";

// Stores the abi for the contract deployment
const abi = [{
    "constant": true,
    "inputs": [],
    "name": "manager",
    "outputs": [{ "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "pickWinner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getPlayers",
    "outputs": [{ "name": "", "type": "address[]" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "enter",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{ "name": "", "type": "uint256" }],
    "name": "players",
    "outputs": [{ "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}];

// exports a complete copy of our contract that we could work with
// our portal to the the blockchain
export default new web3.eth.Contract(abi, address);
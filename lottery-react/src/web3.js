import Web3 from 'web3';

// Request access to MetaMask
window.ethereum.request({method: "eth_requestAccounts"});

// Create a new instance of web3
const web3 = new Web3(window.ethereum);

// Export the instance of web3
export default web3;


const HDWalletProvider = require('@truffle/hdwallet-provider');

const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider (
    'vintage sad best water love outside armed clap island super cram side',
    'https://rinkeby.infura.io/v3/77fe33c2078a4c1a97ca73179d79b13a'
);


// This contract instance could be our gateway to the test network
const web3 = new Web3(provider);

const deploy = async () => {
    // Get the list of all accounts
    // Mnemonic contains not only the private key, but also the public key
    const accounts = await web3.eth.getAccounts();
    const deploymentAccount = accounts[0];
    console.log("Attempting to deploy from account", deploymentAccount);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({gas:'1000000', from: deploymentAccount});

    console.log(interface);
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();
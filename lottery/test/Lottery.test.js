const assert = require('assert');
const ganache = require('ganache-cli'); // local test
const Web3 = require('Web3');
const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require('../compile.js');

let lottery;
let accounts;

beforeEach(async() => {
    // Get all the accounts
    accounts = await web3.eth.getAccounts();

    // By using the first account, deploy
    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas:'1000000'}); 
});

describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        // Assert that the lottery contract is deployed.
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        // Assert that you could enter a lottery by an account
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        }); 

        // Assert that you could get the list of players
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        // Assert that the first player is the correct account
        assert.equal(accounts[0], players[0]); 

        // Assert that the number of players is one
        assert.equal(1, players.length); 
    });

    it('allows multiple accounts to enter', async () => {
        // Assert that multiple accounts could enter a lottery
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        }); 

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        }); 

        // Assert that you could enter a lottery by an account
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        }); 

        // Assert that you could get the list of players
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        // Assert that the number of players is three
        assert.equal(3, players.length); 

        // Assert that the first player is the correct account
        assert.equal(accounts[0], players[0]); 
        assert.equal(accounts[1], players[1]); 
        assert.equal(accounts[2], players[2]); 
    })

    it('requires a minimum amount of ether to enter', async() => {
        // Makes sure that a user cannot enter a lottery without giving the required ether
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0.001', 'ether')
            })
            assert(false);
        } catch (err) {
            assert(err);
        }
    })

    it('pickWinner function can be called only by the manager', async() => {
        // Makes sure that the manager is the only one that can call the pickWinner function
        try {
            await lottery.methods.pickManager.call({
                from: accounts[1]
            })
            assert(false);
        } catch (err) {
            assert(err);
        }
    })

    it('send money to the winner and resets the players array', async () => {

        // One account enters the lottery via one ehter
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('1', 'ether')
        }); 

        // Return the initial balance
        const initialBalance = await web3.eth.getBalance(accounts[0]);

        // Pick the winner 
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        // Return the final balance
        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance - initialBalance;

        assert(difference > web3.utils.toWei('0.8', 'ether'))
        assert(difference < web3.utils.toWei('1', 'ether'))

        // Make sure that the players array is set to null
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(players.length, 0)
    })
});




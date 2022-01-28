import React, { Component } from 'react'; //different
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };
  
  async componentDidMount() {
    // Runs after the first render() lifecycle
    // Return the manager of the contract
    const manager = await lottery.methods.manager().call();
    // Return the player of the contract
    const players = await lottery.methods.getPlayers().call();
    // Return the balance of the contract
    const balance = await web3.eth.getBalance(lottery.options.address);


    this.setState({
      manager, players, balance
    });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    // Get the accounts associated with this metamask
    const accounts = await web3.eth.getAccounts();

    // Set the message to wait on the transaction success
    this.setState({message: "Waiting on transaction success..."});

    // Send the transactions across the network to enter the lottery 
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: "You have been entered to the lottery!"});
  }

  onClick = async (event) => {
    event.preventDefault();

    // Set the message to wait on the transaction successs
    this.setState({message: "Waiting on transaction success..."});

    // Get the accounts associated with this metamask
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })
    
    // Declare that a winner has been win
    this.setState({message: "A winner has been picked!"})
  }

  render() {
    return ( 
      <div>
        <h2> Lottery Contract </h2>
        <p> This contract is managed by {this.state.manager}. There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance)} ether. 
        </p>

        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
            value = {this.state.value}
            onChange={event => {
              this.setState({value: event.target.value})
            }}></input>
          </div>
          <button>Enter</button>
        </form>
        <hr/>

        <h4> Ready to pick a winner? </h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <h1>{this.state.message}</h1>

      </div>
      );
    }
}

export default App;
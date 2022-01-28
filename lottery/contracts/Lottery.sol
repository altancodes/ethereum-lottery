pragma solidity ^0.4.17;

contract Lottery {
    address public manager; 
    address[] public players;
    
    function Lottery() public {
        // Assign the manager to be the person who launched the contract
        manager = msg.sender;
    }
    
    function enter() public payable {
        // Requires ether to join the contest
        require(msg.value > .01 ether); // this might fail, it won't say why it failed
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        // Returns 
        return uint(keccak256(block.difficulty, now, players)); //keccak256();
    }

    function pickWinner () public restricted {
        // Picks the winner of the lottery
        // make sure that contract owner is able to call this function only 
        require(msg.sender == manager);
        // Pick a winner through pseudonumber generator
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        // Assign a dynamic list to the list of initial size of 0
        players = new address[](0);
    }


    function getPlayers() public view returns (address[]) {
        // Returns all the players in the contract
        return players;
    }

    modifier restricted() {
        // modifier to restrict access to some function
        // this only allows the manager to run certain public functions
        require(msg.sender == manager); 
        _;
    }
}
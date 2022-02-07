// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract WavePortal{
    //even emitter to create a new message
    event newWave(address indexed from, uint256 timestamp, string message);
    //structure of each wave
    struct Wave{
        address sender;
        uint256 timestamp;
        string message;
    }
    //this is where the messages will be stored
    Wave[] waves;

    uint256 totalWaves;
    constructor() payable{
        console.log("What up world, its ya boy SmartContract.");
    }
    function wave(string memory _message) public{
        totalWaves+=1;
        console.log("%s has sent the message:'%s'",msg.sender,_message);
        //storing the individual message in the global waves struct
        waves.push(Wave(msg.sender, block.timestamp,_message));
        //emit the event to the frontend
        emit newWave(msg.sender, block.timestamp,_message);
        uint256 prizeAmount = 0.0001 ether;
        require(prizeAmount <= address(this).balance,
        "This contract has lesser money than the prize amount");
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    //this function returns all the waves that have happened so far
    function getAll() public view returns(Wave[] memory){
        return waves;
    }
    function getTotalWaves() public view returns(uint256){
        console.log("%s is the total number of waves", totalWaves);
        return totalWaves;
    }
}
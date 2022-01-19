// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;
    constructor(){
        console.log("What up world, its ya boy SmartContract.");
    }
    function wave() public{
        totalWaves+=1;
        console.log("%s has waved", msg.sender);
    }
    function getTotalWaves() public view returns(uint256){
        console.log("%s is the total number of waves", totalWaves);
        return(totalWaves);
    }
}
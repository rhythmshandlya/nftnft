// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Wallet {
    address admin;
    uint256 funds;
    mapping(address => uint256) public balance;

    constructor() {
        admin = msg.sender;
        funds = 0;
    }

    function add() public payable {
        funds += (msg.value / (1 ether));
        balance[msg.sender] += (msg.value / (1 ether));
    }

    function withdraw(uint256 _value) public returns (uint256) {
        require(balance[msg.sender] >= _value, "Insfficient Funds");
        payable(address(msg.sender)).transfer(_value * (1 ether));
        balance[msg.sender] -= _value;
        return balance[msg.sender];
    }

    function getBalance() public view returns (uint256) {
        return balance[msg.sender];
    }
}

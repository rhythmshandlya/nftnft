// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract wallet{
//owner 
//map address - uint
//send eth
//withdraw eth
//balance (wallet)
//
    address admin ;
    uint funds;
    mapping(address => uint256) public balanceOf;
    constructor(){
        admin=msg.sender;
        funds=0;
    }
     
   function sendEth() public payable {
        funds += (msg.value * (1 ether));
        balanceOf[msg.sender]=(msg.value / (1 ether));
    }
   function getBalance() public view returns (uint){
       return address(this).balance/(1 ether);
   }
   
   function withdrawEth(uint _value) public payable returns(string memory) {
       if(msg.sender==admin){
       require(payable(msg.sender).send(_value*1 ether), 'Failed to send Ether');
       return("Successful");
       }

       return("Not Owner");
   
   }
}
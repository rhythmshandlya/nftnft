pragma solidity >=0.4.22 <0.9.0;
 
contract wallet{
   receive() external payable {}

   function getBalance() public view returns (uint){
       return address(this).balance;
   }

   function sendEth( address payable recipient) public payable{
       recipient.transfer((1 ether)*5);
   }
}


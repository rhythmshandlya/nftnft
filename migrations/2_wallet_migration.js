var TodoList = artifacts.require("./Wallet.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};
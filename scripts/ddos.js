// Load Web3.js library and connect to the local Ethereum node
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
// Load the contract ABI and address
const DDosMitigation = artifacts.require("DDosMitigation");
module.exports = function(deployer) {
  deployer.deploy(DDosMitigation);
};
const contractAddress = '0x...'; // Insert the address of the deployed contract here
// Create a new contract instance using the ABI and address
const contract = new web3.eth.Contract(contractAbi, contractAddress);
// Get the token balance of an account
const accountAddress = '0x...'; // Insert the address of the account here
contract.methods.getTokenBalance(accountAddress).call((error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Token balance of ${accountAddress}: ${result}`);
  }
});

// Send tokens to another account
const recipientAddress = '0x...'; // Insert the address of the recipient here
const amount = 10;
web3.eth.getAccounts().then((accounts) => {
  const senderAddress = accounts[0];
  contract.methods.sendTokens(recipientAddress, amount).send({ from: senderAddress })
    .on('receipt', (receipt) => {
      console.log(`Transaction receipt: ${JSON.stringify(receipt, null, 2)}`);
    })
    .on('error', (error) => {
      console.error(error);
    });
});

// Perform DDoS mitigation
web3.eth.getAccounts().then((accounts) => {
  const senderAddress = accounts[0];
  contract.methods.mitigate().send({ from: senderAddress })
    .on('receipt', (receipt) => {
      console.log(`Transaction receipt: ${JSON.stringify(receipt, null, 2)}`);
    })
    .on('error', (error) => {
      console.error(error);
    });
});

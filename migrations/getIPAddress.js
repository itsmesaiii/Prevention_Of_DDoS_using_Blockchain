const Web3 = require('web3');
const contractAbi = require('./IPStorage.json'); // Assuming you have the ABI of your contract
const contractAddress = '0xF092619924FdA992fA1F4D38d96bFBDb5463206e'; // Replace with the address of your deployed contract
const web3 = new Web3('http://localhost:7545'); // Assuming Ganache is running on default port 7545

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Example function to retrieve stored IP address for a specific block number
async function getIPAddress(blockNumber) {
    const result = await contract.methods.blockDataMap(blockNumber).call();
    return result.ipAddress;
}

// Example usage
const blockNumber = 1; // Replace with the block number you're interested in
getIPAddress(blockNumber)
    .then(ipAddress => console.log(`IP address stored in block ${blockNumber}: ${ipAddress}`))
    .catch(err => console.error('Error:', err));

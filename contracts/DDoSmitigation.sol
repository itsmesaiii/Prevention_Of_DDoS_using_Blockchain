// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DDosMitigation {
    address public owner;
    mapping(address => bool) public nodes;
    mapping(address => uint256) public tokenBalances;
    uint256 public maxTokens = 100;
    event DDoSAttackDetected(address indexed attacker, string ipAddress, uint256 intensity, uint256 timestamp); // Updated event definition
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function addNode(address node) external onlyOwner {
        nodes[node] = true;
    }

    function removeNode(address node) external onlyOwner {
        nodes[node] = false;
    }

    function isNode(address node) external view returns (bool) {
        return nodes[node];
    }

    function reportDDoSAttack(address attacker, string memory ipAddress, uint256 intensity) external {
        require(nodes[msg.sender], "Only nodes can report DDoS attacks");
        require(intensity > 0, "Intensity must be greater than zero");

        // Additional validation or processing logic can be added here

        // Log the DDoS attack details in the blockchain including IP Address
        emit DDoSAttackDetected(attacker, ipAddress, intensity, block.timestamp);

        // Implement mitigation logic or notify other components
    }

    function getTokenBalance(address sender) external view returns (uint256) {
        return tokenBalances[sender];
    }

    function sendTokens(address recipient, uint256 amount) external {
        require(nodes[msg.sender], "Only nodes can send tokens");
        require(amount <= maxTokens, "Transfer amount exceeds maxTokens");
        require(tokenBalances[msg.sender] >= amount, "Insufficient balance");

        tokenBalances[msg.sender] -= amount;
        tokenBalances[recipient] += amount;
    }

    function mitigate() external {
        require(nodes[msg.sender], "Only nodes can mitigate attacks");
        require(tokenBalances[msg.sender] > 0, "Insufficient tokens");

        // Additional mitigation logic can be added here

        tokenBalances[msg.sender]--;
    }
}

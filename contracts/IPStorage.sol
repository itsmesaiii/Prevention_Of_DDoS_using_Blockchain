// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract IPStorage {
    struct BlockData {
        string ipAddress;
        uint256 arbitraryData;
    }
    mapping(uint256 => BlockData) public blockDataMap;
    function storeRandomIP() external {
        uint256 blockNumber = block.number;
        bytes32 blockHashBytes = blockhash(blockNumber);
        bytes4 blockHash = bytes4(blockHashBytes);
        uint256 randomNumber = uint256(uint32(blockHash)) % 256;        
        string memory ipAddress = string(abi.encodePacked("192.168.1.", uint256(randomNumber)));
        blockDataMap[blockNumber] = BlockData(ipAddress, randomNumber);
    }
}

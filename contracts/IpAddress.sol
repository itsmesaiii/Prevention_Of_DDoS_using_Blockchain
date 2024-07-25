// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


/**
   * @title ContractName
   * @dev ContractDescription
   * @custom:dev-run-script file_path
   */
   
contract IpAddress {

    struct IP {
        uint node;
        string ipAddress;
        string state;
        uint256 timestamp;
    }

    mapping (address => IP) blacklistIP;
    address[] public blacklistIPaddress;

    function setIPAddress(address _address, uint _node, string memory _ipAddress, string memory _state, uint256 _timestamp) public {
        IP storage variable = blacklistIP[_address];
        variable.node = _node;
        variable.ipAddress = _ipAddress;
        variable.state = _state;
        variable.timestamp = _timestamp;
        
        blacklistIPaddress.push(_address); 
    }

    function getIPs() view public returns(address[] memory) {
       return blacklistIPaddress; 
    }

    function getIPAddress(address _address) view public returns (uint, string memory, string memory, uint256) {
       return (blacklistIP[_address].node, blacklistIP[_address].ipAddress, blacklistIP[_address].state, blacklistIP[_address].timestamp);
   }
   
   function countIps() view public returns (uint) {
       return blacklistIPaddress.length; 
   }
}

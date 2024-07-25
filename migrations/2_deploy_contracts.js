const DDOSMitigation = artifacts.require("DDOSMitigation");

module.exports = function(deployer) {
  deployer.deploy(DDOSMitigation);
};
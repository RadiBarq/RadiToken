var RadiToken = artifacts.require("./RadiToken.sol");

module.exports = function(deployer) {
  deployer.deploy(RadiToken, 1000000);
};

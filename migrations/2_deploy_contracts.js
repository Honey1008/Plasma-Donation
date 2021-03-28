var PlasmaDonation = artifacts.require("./PlasmaDonation.sol");

module.exports = function(deployer) {
  deployer.deploy(PlasmaDonation);
};

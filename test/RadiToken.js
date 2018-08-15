 var RadiToken = artifacts.require("./RadiToken.sol")


 contract('RadiToken', function(accounts){


    it ('set the total supply upon deployment', function(){

        return RadiToken.deployed().then(function(instance){

            tokenInstance = instance;
            return tokenInstance.totalSupply();
  
        }).then(function(totalSupply){
 
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply 1,0000,000')

        });

    });

 })
 var RadiToken = artifacts.require("./RadiToken.sol")


 contract('RadiToken', function(accounts){

    it ('initializes the contract with the correct values', function(){

        return RadiToken.deployed().then(function(instance){


            tokenInstance = instance
            return tokenInstance.name();

        }).then(function(name){

            assert.equal(name, 'Radi Token', 'has the correct name'); 
            return tokenInstance.symbol();
        }).then(function(symbol){

            assert.equal(symbol, 'RADI', 'has the correct symbol');
            return tokenInstance.standard();

        }).then(function(standard){
              assert.equal(standard,  'Radi Token v1.0', 'has the correct standard');
        });
    })

    it ('set the total supply upon deployment', function(){

        return RadiToken.deployed().then(function(instance){

            tokenInstance = instance;
            return tokenInstance.totalSupply();
  
        }).then(function(totalSupply){
 
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply 1,0000,000')
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){

            assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin account')

        });

    });

    it('transfers token ownership', function(){
     
        return RadiToken.deployed().then(function(instance){
   
               tokenInstance = instance;
               return tokenInstance.transfer.call(accounts[1], 9999999999999999999999);
        }).then(assert.fail).catch(function(error){
               assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');

               return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
        }).then(function(success){

            assert.equal(success, true, 'it returns true');

               return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'l ogs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the account the tokens are transferred to');

            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
   
               assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account');
               return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
   
           assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');

        });
 });


 });
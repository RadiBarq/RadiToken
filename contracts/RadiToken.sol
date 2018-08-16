pragma solidity ^0.4.2;

contract RadiToken{


    //Name
    string public name =  "Radi Token";
    //Symbol
    string public symbol = "RADI";
    uint256 public totalSupply;  
    string public standard = "Radi Token v1.0";

    event Transfer(

        address indexed _from,
        address indexed _to,
        uint256 _value
        
    );



//Radi Token v1.0      

    mapping(address => uint256) public balanceOf;
  
    function RadiToken(uint256 _initialSupply) public
    {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        // allocate the initial supply   

    }

    // Transfer Tokins
    // Exception if acocunt does not have enough
    // Return a boolean
    // Transfer Event
 
    function transfer(address _to, uint256 _value) public returns(bool success)
    {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        Transfer(msg.sender, _to, _value);

        return true;
        
    }

}

//Constructor
// Set the total number of tokens
//Read the total number of tokens
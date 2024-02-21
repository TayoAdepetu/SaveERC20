solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

solidity
contract TokenSwap {
    using SafeMath for uint256;

    // Struct to store token data
    struct TokenData {
        IERC20 token;
        uint256 rate;
    }

    // Mapping to store token data
    mapping(string => TokenData) public tokenMapping;

    function addToken(string memory _tokenSymbol, address _tokenAddress, uint256 _rate) public {
    IERC20 newToken = IERC20(_tokenAddress);
    tokenMapping[_tokenSymbol] = TokenData(newToken, _rate);
}

function swap(string memory _fromSymbol, string memory _toSymbol, uint256 _amount) public {
    require(tokenMapping[_fromSymbol].token.balanceOf(msg.sender) >= _amount, "Insufficient balance");

    // Calculate the amount to get after swap
    uint256 amountToGet = _amount.mul(tokenMapping[_toSymbol].rate).div(tokenMapping[_fromSymbol].rate);
    
    // Transfer the tokens
    tokenMapping[_fromSymbol].token.transferFrom(msg.sender, address(this), _amount);
    tokenMapping[_toSymbol].token.transfer(msg.sender, amountToGet);
}

function changeRate(string memory _tokenSymbol, uint256 _newRate) public {
    tokenMapping[_tokenSymbol].rate = _newRate;
}
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract PirateToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("PirateToken", "PRT") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function requestToken(address to) public onlyRole(MINTER_ROLE){
        require(balanceOf(to) <= 1, "Please use previous coins..!");
        transfer(to,1);
    }

    function addAdmin(address to) public onlyRole(MINTER_ROLE){
        _grantRole(MINTER_ROLE, to);
    }
}
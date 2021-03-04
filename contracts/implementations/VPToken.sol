// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import "../IVPToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


abstract contract VPToken is ERC20, IVPToken {

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {

    }
}
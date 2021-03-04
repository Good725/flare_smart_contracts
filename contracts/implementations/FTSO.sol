// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;

import "../IVPToken.sol";

contract FTSO {

    uint256 public constant PRICE_DECIMALS = 4;

    IVPToken public fFlr; // wrapped FLR

    IVPToken public fAsset; // the Fasset for this FTSO

    // consider mapping and not array
    uint[] private assetDollarPrice; // asset price per epoch
}


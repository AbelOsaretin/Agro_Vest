// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {FarmEscrow} from "../src/FarmEscrow.sol";

contract FarmEscrowScript is Script {
    FarmEscrow public farmEscrow;
    function setUp() public {}
    function run() public {
        vm.startBroadcast();
        farmEscrow = new FarmEscrow(0xAC215e666287e2B02Dc0677B914Da59897E0d286);
        vm.stopBroadcast();
    }
}

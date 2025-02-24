// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Farm} from "../src/Farm.sol";

contract FarmScript is Script {
    Farm public farm;
    function setUp() public {}
    function run() public {
        vm.startBroadcast();
        farm = new Farm(
            address(0xAC215e666287e2B02Dc0677B914Da59897E0d286),
            address(0xe98dcD281C069F0B980111554dFa79889Bc59aD5)
        );
        vm.stopBroadcast();
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Investment} from "../src/Investment.sol";

contract InvestmentScript is Script {
    Investment public investment;
    function setUp() public {}
    function run() public {
        vm.startBroadcast();
        investment = new Investment(0xAC215e666287e2B02Dc0677B914Da59897E0d286);
        vm.stopBroadcast();
    }
}

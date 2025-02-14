// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Farm} from "../src/Farm.sol";
import {console} from "forge-std/console.sol";
import {Error} from "../src/Library/Error.sol";

contract FarmTest is Test {
    Farm public farm;
    address farmOwner = makeAddr("farmOwner");

    function setUp() public {
        address TokenAddress = makeAddr("Token");

        address EscrowAddress = makeAddr("Escrow");
        farm = new Farm(TokenAddress, EscrowAddress);
    }

    function test_Farm_Registration() public {
        vm.startPrank(farmOwner);

        uint256 phoneContact = uint256(701234);

        vm.expectRevert(Error.NameCannotBeEmpty.selector);

        farm.registerFarms(
            "",
            "AbelFarmPicture",
            "Lagos, Nigeria",
            phoneContact,
            farmOwner,
            "example@gmail.com"
        );

        farm.registerFarms(
            "AbelFarm",
            "AbelFarmPicture",
            "Lagos, Nigeria",
            phoneContact,
            farmOwner,
            "example@gmail.com"
        );
        vm.stopPrank();
    }

    function test_FarmDetails_Update() public {
        test_Farm_Registration();
        address farmOwner = makeAddr("farmOwner");
        address impersonator = makeAddr("Impersonator");
        vm.expectRevert(Error.InvalidFarmIndex.selector);
        farm.updateDetails(
            111,
            "AbelSnailFarm",
            "AbelSnailFarmPicture",
            "Lagos, Nigeria",
            uint256(706555),
            "example@gmail.com"
        );
        vm.expectRevert(Error.YouAreNotRegistered.selector);
        farm.updateDetails(
            0,
            "AbelSnailFarm",
            "AbelSnailFarmPicture",
            "Lagos, Nigeria",
            uint256(706555),
            "example@gmail.com"
        );

        vm.startPrank(impersonator);
        farm.registerFarms(
            "FakeFarm",
            "FakeFarmPicture",
            "Lagos, Nigeria",
            uint256(701233),
            impersonator,
            "example@gmail.com"
        );
        vm.expectRevert(Error.TheFarmDoesNotBelongToYou.selector);
        farm.updateDetails(
            0,
            "AbelSnailFarm",
            "AbelSnailFarmPicture",
            "Lagos, Nigeria",
            uint256(706555),
            "example@gmail.com"
        );
        vm.stopPrank();

        vm.startPrank(farmOwner);
        farm.updateDetails(
            0,
            "AbelSnailFarm",
            "AbelSnailFarmPicture",
            "Lagos, Nigeria",
            uint256(706555),
            "example@gmail.com"
        );
        vm.stopPrank();
    }

    function test_Add_Farm_Product() public {
        test_Farm_Registration();
        vm.startPrank(farmOwner);
        farm.addFarmProduct(
            "Corn",
            "CornPicture",
            "New Harvest of corns",
            uint256(1)
        );
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
}

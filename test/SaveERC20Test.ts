// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import { ethers } from "hardhat";
import { expect } from "chai";

contract SaveERC20Test {

    address savingToken;
    address owner;
    SaveERC20 saveERC20;

    before(async () => {
        // Deploying the SaveERC20 contract
        const SaveERC20Factory = await ethers.getContractFactory("SaveERC20");
        saveERC20 = await SaveERC20Factory.deploy(savingToken);

        // Getting the owner address
        [owner] = await ethers.getSigners();
    });

    it("should deposit tokens successfully", async () => {
        // Approving tokens for transfer
        const tokenInstance = await ethers.getContractAt("IERC20", savingToken);
        await tokenInstance.approve(saveERC20.address, 1000);

        // Depositing tokens
        await saveERC20.deposit(100);

        // Checking user balance
        const userBalance = await saveERC20.checkUserBalance(owner.address);
        expect(userBalance).to.equal(100);
    });

    it("should withdraw tokens successfully", async () => {
        // Withdrawing tokens
        await saveERC20.withdraw(50);

        // Checking user balance after withdrawal
        const userBalance = await saveERC20.checkUserBalance(owner.address);
        expect(userBalance).to.equal(50);
    });

    it("should allow owner to withdraw tokens", async () => {
        // Owner withdrawing tokens
        await saveERC20.ownerWithdraw(50);

        // Checking contract balance after owner withdrawal
        const contractBalance = await saveERC20.checkContractBalance();
        expect(contractBalance).to.equal(0);
    });
}

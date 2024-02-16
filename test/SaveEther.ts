import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("SaveEtherTest", function () {
  async function deploySaveEther() {
    const SaveEther = await ethers.getContractFactory("SaveEther");
    const saveEther = await SaveEther.deploy();
    await saveEther.deployed();

    return { saveEther };

    // [owner, receiver] = await ethers.getSigners();
  }

  describe(""),
    function () {
      it("should deposit and check savings", async function () {
        const { saveEther } = await deploySaveEther();
        const tx = await saveEther.deposit(1);

        // Wait for transaction to be mined
        await tx.wait();

        const address = "checkingCaller"; //this is just a placeholder

        const savings = await saveEther.checkSavings(address);

        expect(savings).to.equal(1, "Deposit amount not saved correctly");
      });

      it("should deposit, withdraw and check savings", async function () {
        //First deposit
        const { saveEther } = await deploySaveEther();
        const tx = await saveEther.deposit(1);
        await tx.wait();

        //Now, wothdraw part of it
        const Withdraw = await saveEther.withdraw(0.5);
        await Withdraw.wait();

        //Now, check balance
        const address = "checkingCaller"; //this is just a placeholder
        const savings = await saveEther.checkSavings(address);
        expect(savings).to.equal(0.5, "Savings not correct after withdrawal");
      });

      it("should deposit, send out savings, and check receiver savings", async function () {
        //First deposit
        const { saveEther } = await deploySaveEther();
        const tx = await saveEther.deposit(1);
        await tx.wait();

        //Now, send out savings
        const receiver_address = "checkingCaller"; //this is just a placeholder
        const Sending = await saveEther.sendOutSaving(receiver_address, 0.4);
        await Sending.wait();

        //Now, check balance
        const address = "checkingCaller"; //this is just a placeholder
        const savings = await saveEther.checkSavings(receiver_address);
        expect(savings).to.equal(
          0.6,
          "Receiver savings not correct after sending out savings"
        );
      });
    };
});

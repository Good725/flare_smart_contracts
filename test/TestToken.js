const { assert } = require("hardhat");
const DummyVPToken = artifacts.require("DummyVPToken");
contract("DummyVPToken", accounts => {
  let DummyTokenContract;
  let DummyToken;
  before(async function() {
    DummyToken = await DummyVPToken.new("Dummy Vote Power Token", "DVPT");
    DummyTokenContract = new web3.eth.Contract(DummyToken.abi, DummyToken.address);
  });
  describe('test', function () {
    it("Accounts balances are not zero", async function() {
      let balanceAccount0 = await web3.eth.getBalance(accounts[0]);
      let balanceAccount1 = await web3.eth.getBalance(accounts[1]);
      let balanceAccount2 = await web3.eth.getBalance(accounts[2]);
      let balanceAccount3 = await web3.eth.getBalance(accounts[3]);
      let balanceAccount4 = await web3.eth.getBalance(accounts[4]);
      let balanceAccount5 = await web3.eth.getBalance(accounts[5]);
      let balanceAccount6 = await web3.eth.getBalance(accounts[6]);
      let balanceAccount7 = await web3.eth.getBalance(accounts[7]);
      let balanceAccount8 = await web3.eth.getBalance(accounts[8]);
      let balanceAccount9 = await web3.eth.getBalance(accounts[9]);
      assert.notEqual(balanceAccount0, 0);
      assert.notEqual(balanceAccount1, 0);
      assert.notEqual(balanceAccount2, 0);
      assert.notEqual(balanceAccount3, 0);
      assert.notEqual(balanceAccount4, 0);
      assert.notEqual(balanceAccount5, 0);
      assert.notEqual(balanceAccount6, 0);
      assert.notEqual(balanceAccount7, 0);
      assert.notEqual(balanceAccount8, 0);
      assert.notEqual(balanceAccount9, 0);
    });
    it("MinterAmount should be the same as total supply", async function() {
      let totalSupply = await DummyTokenContract.methods.totalSupply().call();
      let balanceOf0 = await DummyTokenContract.methods.balanceOf(accounts[0]).call();
      assert.equal(balanceOf0, totalSupply);
    });
    it("Transfer amount should be the same as other account's balance", async function() {
      let approveAmount = web3.utils.toBN(5 * 10 ** 18);
      let transferAmount = web3.utils.toBN(5 * 10 ** 18);
      await DummyTokenContract.methods.approve(accounts[1], approveAmount).send({from:accounts[0], gas: 3000000, gasPrice: web3.utils.toWei("1", "gwei")});
      await DummyTokenContract.methods.transfer(accounts[1], transferAmount).send({from:accounts[0], gas: 3000000, gasPrice: web3.utils.toWei("1", "gwei")});
      let balanceOf1 = await DummyTokenContract.methods.balanceOf(accounts[1]).call();
      assert.equal(transferAmount, balanceOf1);
    });
    it("Account0's balance should be the same as the account's voting power", async function() {
      let blockNumber = web3.utils.toBN(0);
      let balanceOf0 = await DummyTokenContract.methods.balanceOf(accounts[0]).call();
      let votePower0 = await DummyTokenContract.methods.votePowerOfAt(accounts[0], blockNumber).call();
      assert.equal(balanceOf0, votePower0);
    });
    it("Account1's balance should be the same as the account's voting power", async function() {
      let blockNumber = web3.utils.toBN(0);
      let balanceOf1 = await DummyTokenContract.methods.balanceOf(accounts[1]).call();
      let votePower1 = await DummyTokenContract.methods.votePowerOfAt(accounts[1], blockNumber).call();
      assert.equal(balanceOf1, votePower1);
    });
  });
});

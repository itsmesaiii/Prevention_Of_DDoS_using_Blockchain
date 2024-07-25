const DDosMitigation = artifacts.require("DDosMitigation");

contract("DDosMitigation", accounts => {
  it("should transfer tokens from one node to another", async () => {
    const instance = await DDosMitigation.deployed();
    const node1 = accounts[1];
    const node2 = accounts[2];
    const amount = 50;
    await instance.addNode(node1, { from: accounts[0] });
    await instance.addNode(node2, { from: accounts[0] });
    await instance.sendTokens(node2, amount, { from: node1 });
    const balance1 = await instance.getTokenBalance(node1);
    const balance2 = await instance.getTokenBalance(node2);
    assert.equal(balance1, 50, "Tokens were not transferred successfully");
    assert.equal(balance2, 50, "Tokens were not transferred successfully");
  });

  it("should add a node", async () => {
    const instance = await DDosMitigation.deployed();
    const node = accounts[1];
    await instance.addNode(node, { from: accounts[0] });
    const isNodeAdded = await instance.isNode(node);
    assert.equal(isNodeAdded, true, "Node was not added successfully");
  });

  it("should remove a node", async () => {
    const instance = await DDosMitigation.deployed();
    const node = accounts[1];
    await instance.addNode(node, { from: accounts[0] });
    await instance.removeNode(node, { from: accounts[0] });
    const isNodeRemoved = await instance.isNode(node);
    assert.equal(isNodeRemoved, false, "Node was not removed successfully");
  });

  it("should mitigate a DDoS attack", async () => {
    const instance = await DDosMitigation.deployed();
    const attacker = accounts[1];
    const victim = accounts[2];
    const numRequests = 100;
    for (let i = 0; i < numRequests; i++) {
      await instance.attack({ from: attacker, to: victim });
    }
    await instance.mitigate({ from: accounts[0] });
    const isUnderAttack = await instance.isUnderAttack();
    assert.equal(isUnderAttack, false, "DDoS attack was not mitigated successfully");
  });
});

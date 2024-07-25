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
});

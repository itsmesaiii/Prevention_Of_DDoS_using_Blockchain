contract ("DDosMitigation", accounts => {
  it("should decrement token balance after mitigation", async () => {
    const instance = await DDosMitigation.deployed();
    const node = accounts[1];
    await instance.addNode(node, { from: accounts[0] });
    await instance.sendTokens(node, 10, { from: accounts[0] });
    await instance.mitigate({ from: node });
    const balance = await instance.getTokenBalance(node);
    assert.equal(balance, 9, "Token balance was not decremented successfully");
  });
});

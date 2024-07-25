contract("DDosMitigation", accounts => {
  it("should remove a node and verify it no longer exists", async () => {
    const instance = await DDosMitigation.deployed();
    const node = accounts[1];
    await instance.addNode(node, { from: accounts[0] });
    let isNode = await instance.isNode(node);
    assert.equal(isNode, true, "Node was not added successfully");
    await instance.removeNode(node, { from: accounts[0] });
    isNode = await instance.isNode(node);
    assert.equal(isNode, false, "Node was not removed successfully");
  });
});

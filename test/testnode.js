contract("DDosMitigation", accounts => {
  it("should add a node and verify it exists", async () => {
    const instance = await DDosMitigation.deployed();
    const node = accounts[1];
    await instance.addNode(node, { from: accounts[0] });
    const isNode = await instance.isNode(node);
    assert.equal(isNode, true, "Node was not added successfully");
  });
});

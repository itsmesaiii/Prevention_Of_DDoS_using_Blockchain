module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,
      network_id: 5777,       // Any network (default: none)
    },
  },
  compilers: {
    solc: {
      version: "0.8.9",     // Version of Solidity compiler to use
    }
  }
};



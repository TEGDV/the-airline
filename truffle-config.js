module.exports = {
  networks: {
    development: {      
      host: 'localhost',
      port: 7545,
      network_id: '*',
      gas: 5000000
    }
  },
    compilers: {
    solc: {
      version: "^0.8.0", // A version or constraint - Ex. "^0.5.0"
      parser: "solcjs", // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: true,
          runs: 200, // Optimize for how many times you intend to run the code
        },
      },
    },
  }
}

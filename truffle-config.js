const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = 'ten diesel combine spirit where six robust vicious pave gift budget bubble'
const rinkebyEndPoint = 'https://rinkeby.infura.io/v3/6af9077f8a2048acadbef342a747f5b1'
module.exports = {
  contracts_build_directory: './src/abis/',
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*',
      gas: 5000000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, rinkebyEndPoint),
      network_id: 4,
    }
  },
  compilers: {
    solc: {
      version: '^0.8.0', // A version or constraint - Ex. "^0.5.0"
      parser: 'solcjs', // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: true,
          runs: 200, // Optimize for how many times you intend to run the code
        },
      },
    },
  }
}

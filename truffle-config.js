require('dotenv').config({ path: './.env.local' })
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = process.env.MNEMONIC
const rinkebyEndPoint = process.env.INFURA_ENDPOINT
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
      addressIndex: 3,
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

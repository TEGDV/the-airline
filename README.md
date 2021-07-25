# The Airline
---

Personal Solidity contract development to manage airline services based on blockchain, the contract is deployed on the rinkenby network [here](https://rinkeby.etherscan.io/address/0x1C48CFA413d10EAa82E5847C6eFD1d6856e55F80)

# Installation
---

For local development its necesary to install truffle via npm

```bash
npm i
```

Then its necesary have installed [Ganache](https://www.trufflesuite.com/ganache) and open a workspace.

Next, run test to check its every thing its working well with the contract

```
truffle test
```

Next, deploy the contract on your local network 

```
truffle migrate --reset
```

This comands deploy the contract on the Ganache local blockchain, that its designed to test the contracts behavior before runs into production

Finally run 

```
npm run start
```

to open the UI app to interact with metamask and sign transactions, remember use the local RPC.


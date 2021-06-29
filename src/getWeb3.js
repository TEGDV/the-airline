import Web3 from 'web3'

const getWeb3 = async () =>{
  await Web3.givenProvider.enable()
  const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:7545')
  return web3
}

export default getWeb3

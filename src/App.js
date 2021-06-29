import React, { useEffect, useState } from 'react'
import Panel from './Panel'
import getWeb3 from './getWeb3'
import AirlineContract from './abis/Airline.json'
import AirlineContext from './AirlineContext'
import AirlineService from './AirlineService'

const App = () => {
  const [web3, setWeb3] = useState(undefined)
  const [account, setAccount] = useState(undefined)
  const [contract, setContract] = useState([])
  const [balance, setBalance] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(async () =>{
    try {
      // Get web3 instance
      const web3 = await getWeb3()

      // User web3 to get the user's accounts.
      const account = (await web3.eth.getAccounts())[0]

      // Get contract instance
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = AirlineContract.networks[networkId]
      const instance = new web3.eth.Contract(AirlineContract.abi, deployedNetwork && deployedNetwork.address)
      const userBalance = web3.utils.fromWei(await web3.eth.getBalance(account), 'ether')
      setWeb3(web3)
      setAccount(account)
      setContract(instance)
      setBalance(userBalance)
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(()=>{
    if (typeof web3 !== undefined && account !== undefined && contract !== undefined) {
      setLoading(false)
    }
  }, [web3, contract, account])

  return loading ? <div>Loading ...</div> : (<React.Fragment>
    <AirlineContext.Provider value={{ web3, account, contract }}>
      <div className="jumbotron">
        <h4 className="display-4">Welcome to the Airline!</h4>
      </div>

      <div className="row">
        <div className="col-sm">
          <Panel title="Balance">
            <p><strong>{account}</strong></p>
            <p>{balance}</p>
          </Panel>

        </div>
        <div className="col-sm">
          <Panel title="Loyalty points - refundable ether" />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <Panel title="Available flights" >
            <AirlineService/>
          </Panel>

        </div>
        <div className="col-sm">
          <Panel title="Your flights" />
        </div>
      </div>
    </AirlineContext.Provider>
  </React.Fragment>)
}

export default App

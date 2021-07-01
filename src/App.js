import React, { useEffect, useState } from 'react'
import Panel from './Panel'
import getWeb3 from './getWeb3'
import AirlineContract from './abis/Airline.json'
import AirlineContext from './AirlineContext'
import AirlineService from './AirlineService'
import YourFlights from './YourFlights'
import RefundableEther from './RefundableEther'
import Balance from './Balance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [web3, setWeb3] = useState(undefined)
  const [account, setAccount] = useState(undefined)
  const [contract, setContract] = useState([])
  const [balance, setBalance] = useState('0')
  const [loading, setLoading] = useState(true)
  const [points, setPoints] = useState('0')
  const notifyPurchase = (address, price) => {
    toast(`{The address ${address} purchase a flight for ${price} wei VERGA DE MONO}`)
  }
  useEffect(() =>{
    const load = async () => {
      try {
      // Get web3 instance
        const web3 = await getWeb3()

        // User web3 to get the user's accounts.
        const account = (await web3.eth.getAccounts())[0]
        // Get contract instance
        const networkId = await web3.eth.net.getId()
        const deployedNetwork = AirlineContract.networks[networkId]
        const instance = new web3.eth.Contract(AirlineContract.abi, deployedNetwork && deployedNetwork.address)
        setWeb3(web3)
        setAccount(account)
        setContract(instance)
        instance.events.FlightPurchased((e, result) => {
          result.returnValues.customer === account ? console.log(result.returnValues.customer) :
            notifyPurchase(result.returnValues.customer, result.returnValues.price)
        })
      } catch (e) {
        console.log(e)
      }
    }
    load()

    ethereum.on('accountsChanged', function () {
      setLoading(true)
      load()
    })
  }, [])

  useEffect(()=>{
    if (typeof web3 !== undefined && account !== undefined && contract !== undefined) {
      setLoading(false)

    }
  }, [web3, contract, account])

  return loading ? <div>Loading ...</div> : (<React.Fragment>
    <AirlineContext.Provider value={{ web3, account, contract, setLoading, points, setPoints, balance, setBalance }}>
      <div className="jumbotron">
        <h4 className="display-4">Welcome to the Airline!</h4>
      </div>

      <div className="row">
        <div className="col-sm">
          <Panel title="Balance">
            <Balance/>
          </Panel>

        </div>
        <div className="col-sm">
          <Panel title="Loyalty points - refundable ether" >
            <RefundableEther/>
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <Panel title="Available flights" >
            <AirlineService/>
          </Panel>

        </div>
        <div className="col-sm">
          <Panel title="Your flights">
            <YourFlights />
          </Panel>
        </div>
      </div>
    </AirlineContext.Provider>
    <ToastContainer />
  </React.Fragment>)
}

export default App

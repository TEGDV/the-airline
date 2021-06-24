import React, { useEffect, useState } from 'react'
import Panel from './Panel'
import getWeb3 from './getWeb3'

const App = () => {
  const [web3, setWeb3] = useState(undefined)
  const [account, setAccount] = useState(undefined)
  const [contract, setContract] = useState([])

  useEffect(() =>{
    const init = async () => {
      try {
        // Get web3 instance
        const web3 = await getWeb3()

        // User web3 to get the user's accounts.
        const account = (await web3.eth.getAccounts())[0]

        // Get contract instance
        setWeb3(web3)
        setAccount(account)
      } catch (e) {
        alert('Pinches beaners estan todos joudiros')
        console.log(e)
      }
    }
    init()

  }, [])
  return (<React.Fragment>
    <div className="jumbotron">
      <h4 className="display-4">Welcome to the Airline! </h4>
    </div>

    <div className="row">
      <div className="col-sm">
        <Panel title="Balance" />
      </div>
      <div className="col-sm">
        <Panel title="Loyalty points - refundable ether" />
      </div>
    </div>
    <div className="row">
      <div className="col-sm">
        <Panel title="Available flights" />
      </div>
      <div className="col-sm">
        <Panel title="Your flights" />
      </div>
    </div>
  </React.Fragment>)
}

export default App

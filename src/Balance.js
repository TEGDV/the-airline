
import React, { useContext, useEffect, useState } from 'react'
import AirlineContext from './AirlineContext'

const YourFlights = () => {

  const { web3, account, balance, setBalance, loading } = useContext(AirlineContext)

  useEffect(async () => {
    try {
      const userBalance = web3.utils.fromWei(await web3.eth.getBalance(account), 'ether')
      setBalance(userBalance)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (!loading && <div>
    <p><strong>{account}</strong></p><p>{balance}</p>
  </div>)
}

export default YourFlights

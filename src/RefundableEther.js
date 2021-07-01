import React, { useContext, useEffect, useState } from 'react'
import AirlineContext from './AirlineContext'

const YourFlights = () => {

  const { web3, account, contract, points, setPoints, setLoading } = useContext(AirlineContext)
  const redeemLoyaltyPoints = async () =>{
    try {
      setLoading(true)
      await contract.methods.redeemLoyaltyPoints().send({ from: account })
      setPoints('0')
      setLoading(false)

    } catch (e) {
      console.log(e)
    }
  }
  useEffect(async () => {
    try {
      const _points = (await contract.methods.getRefundableEther().call({ from: account }))
      setPoints(_points)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (<div> { web3.utils.fromWei(points) } ETH | { points > 0 && (<button onClick={redeemLoyaltyPoints}>Reedeem</button>)}</div>)
}

export default YourFlights

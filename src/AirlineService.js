import React, { useContext, useEffect, useState } from 'react'
import AirlineContext from './AirlineContext'

const AirlineService = () => {

  const { web3, account, contract } = useContext(AirlineContext)
  const [flights, setFlights] = useState([])

  const buyFlight = async (flightIndex, _value) => {
    await contract.methods.buyFlight(flightIndex).send({ from: account, value: _value })
  }

  useEffect(async () => {
    const totalFlights = (await contract.methods.totalFlights().call({ from: account }))
    const _flights = []
    for (let i = 0; i < totalFlights; i++) {
      const flight = await contract.methods.flights(i).call({ from: account })
      _flights.push(flight)
    }
    setFlights(_flights)
  }, [])

  return (flights.map((flight, i) => <div key={i}>{flight.name} | {web3.utils.fromWei(flight.price, 'ether')} <button onClick={() => buyFlight(i, flight.price)}>Buy it</button></div>)
  )
}

export default AirlineService

import React, { useContext, useEffect, useState } from 'react'
import AirlineContext from './AirlineContext'

const AirlineService = () => {

  const { web3, account, contract } = useContext(AirlineContext)
  const [flights, setFlights] = useState([])

  useEffect(async () => {
    const totalFlights = (await contract.methods.totalFlights().call({ from: account }))
    const _flights = []
    for (let i = 0; i < totalFlights; i++) {
      const flight = await contract.methods.flights(i).call({ from: account })
      _flights.push(flight)
    }
    setFlights(_flights)
  }, [])

  return (flights.map((flight, i) => <div key={i}>{flight.name} | {web3.utils.fromWei(flight.price, 'ether')}</div>)
  )
}

export default AirlineService

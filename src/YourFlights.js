import React, { useContext, useEffect, useState } from 'react'
import AirlineContext from './AirlineContext'

const YourFlights = () => {

  const { web3, account, contract } = useContext(AirlineContext)
  const [flights, setFlights] = useState([])

  useEffect(async () => {
    const totalFlights = (await contract.methods.customertotalFlights(account).call())
    const _flights = []
    for (let i = 0; i < totalFlights; i++) {
      const flight = await contract.methods.customerFlights(account, i).call()
      _flights.push(flight)
    }
    setFlights(_flights)
  }, [])

  return (flights.map((flight, i) => <div key={i}>{flight.name}  </div>)
  )
}

export default YourFlights

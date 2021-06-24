const Airline = artifacts.require("Airline")
// Utils to handle numbers with 18 or more digits or decimals
const BigNumber = require('bignumber.js')

let instance

beforeEach(async () => {
  instance = await Airline.new()
})

contract("Airline", (accounts) => {
  it("have available flights", async () => {
    let total = await instance.totalFlights()
    assert(total > 0)
  })

  it("allow customers to buy a flight providing its value", async () => {
    let flight = await instance.flights(0)
    let flightName = flight[0],
      price = flight[1]
    await instance.buyFlight(0, { from: accounts[0], value: price })
    let customerFlight = await instance.customerFlights(accounts[0], 0)
    let customerTotalFlights = await instance.customertotalFlights(accounts[0])
    assert(customerFlight[0], flightName)
    assert(customerFlight[1], price)
    assert(customerTotalFlights, 1)
  })

  
    it('not allow customers to buy flights under the price', async () => {
      let flight = await instance.flights(0)
      let price = flight[1] - 5000
      try{
        await instance.buyFlight(0, {from:accounts[0], value: price})
      }
      catch (e) { return }
      assert.fail()
    })

    
      it('get the real contract balance', async () => {
      let flight = await instance.flights(0)
      let price = new BigNumber(flight[1])
      let flight2 = await instance.flights(1)
      let price2 = new BigNumber(flight2[1]) 

      await instance.buyFlight(0, {from:accounts[0], value: price})
      await instance.buyFlight(1, {from:accounts[0], value: price2})

      let newAirlineBalance = new BigNumber(await instance.getAirlineBalance()) 
      assert(price.plus(price2).isEqualTo(newAirlineBalance))
      })
})

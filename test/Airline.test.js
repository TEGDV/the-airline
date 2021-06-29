const Airline = artifacts.require('Airline')
// Utils to handle numbers with 18 or more digits or decimals
const BigNumber = require('bignumber.js')

let instance

beforeEach(async () => {
  instance = await Airline.new()
})

contract('Airline', (accounts) => {
  it('have available flights', async () => {
    const total = await instance.totalFlights()
    assert(total > 0)
  })

  it('allow customers to buy a flight providing its value', async () => {
    const flight = await instance.flights(0)
    const flightName = flight[0],
      price = flight[1]
    await instance.buyFlight(0, { from: accounts[0], value: price })
    const customerFlight = await instance.customerFlights(accounts[0], 0)
    const customerTotalFlights = await instance.customertotalFlights(accounts[0])
    assert(customerFlight[0], flightName)
    assert(customerFlight[1], price)
    assert(customerTotalFlights, 1)
  })

  it('not allow customers to buy flights under the price', async () => {
    const flight = await instance.flights(0)
    const price = flight[1] - 5000
    try {
      await instance.buyFlight(0, { from: accounts[0], value: price })
    } catch (e) { return }
    assert.fail()
  })

  it('get the real contract balance', async () => {
    const flight = await instance.flights(0)
    const price = new BigNumber(flight[1])
    const flight2 = await instance.flights(1)
    const price2 = new BigNumber(flight2[1])

    await instance.buyFlight(0, { from: accounts[0], value: price })
    await instance.buyFlight(1, { from: accounts[0], value: price2 })

    const newAirlineBalance = new BigNumber(await instance.getAirlineBalance())
    assert(price.plus(price2).isEqualTo(newAirlineBalance))
  })

  it('allow users redeem loyalty points', async () => {

    const flight = await instance.flights(1)
    const price = new BigNumber(flight[1])

    await instance.buyFlight(1, { from: accounts[3], value: price })

    const balance = new BigNumber(await web3.eth.getBalance(accounts[3]))
    await instance.redeemLoyaltyPoints({ from: accounts[3] })
    const newBalance = new BigNumber(await web3.eth.getBalance(accounts[3]))
    console.log(balance, newBalance)
    const customer = await instance.customers(accounts[3])
    const loyalty = customer[0]
    assert(loyalty, 0)
    assert(newBalance > balance)
  })
})

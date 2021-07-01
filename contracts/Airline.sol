// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Airline {
  address public owner;
  
  struct Customer{
    uint loyaltyPoints;
    uint totalFlights;
  }

  struct Flight{
    string name;
    uint price;
  }

  uint etherPoint = 0.005 ether;

  Flight[] public flights;

  mapping(address => Customer) public customers;
  mapping(address => Flight[]) public customerFlights;
  mapping(address => uint) public customertotalFlights;

  event FlightPurchased(address indexed customer, uint price);

  constructor(){
    owner = msg.sender;
    flights.push(Flight('Tokio', 0.1 ether));
    flights.push(Flight('Germany', 0.2 ether));
    flights.push(Flight('Madrid', 0.4 ether));
  }

  function buyFlight(uint _flightIndex) public payable {
    Flight memory flight = flights[_flightIndex];
    require(msg.value == flight.price);
    Customer storage customer = customers[msg.sender];
    customer.loyaltyPoints += 5;
    customer.totalFlights += 1;
    customerFlights[msg.sender].push(flight);
    customertotalFlights[msg.sender] ++;
    emit FlightPurchased(msg.sender, flight.price);
  }

  function totalFlights() public view returns(uint){
    return flights.length;
  }

  function redeemLoyaltyPoints() public payable{
    Customer storage customer = customers[msg.sender];
    uint etherRefund = etherPoint * customer.loyaltyPoints;
    payable(msg.sender).transfer(etherRefund);
    customer.loyaltyPoints = 0;
  }

  function getRefundableEther() public view returns(uint){
    uint points = customers[msg.sender].loyaltyPoints;
    require(points != 0);
    return etherPoint * points;
  }

  function getAirlineBalance() public isOwner view returns (uint){
    address airlineAddress = address(this);
    return airlineAddress.balance;
  }

  modifier isOwner(){
    require(msg.sender == owner);
    _;
  }
}

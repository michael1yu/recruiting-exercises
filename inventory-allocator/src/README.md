# Solution

## Explanation

### Assumptions

* the cost of an additional warehouse far outweighs any costs caused by the order of the warehouses
* orders are represented as objects with unique keys corresponding to item names
* negative values for item counts make the entire order invalid
* based on the provided test cases, the shipments should be outputted in alphabetical order based on the warehouse name

### Logic

At each warehouse, there are essentialy two choices to make: ship from it, skip it. To demonstrate why both choices might yield the optimal solution consider:

* When there is no single warehouse that can ship the entire order, but the first two warehouses combined can ship the order, then we want to choose the first two warehouses

* When there is a single warehouse that can ship the entire order, but it is the last warehouse, then we want to choose the last warehouse and skip the rest since the ability to ship the entire order significantly outweighs the fact that it is the last warehouse

Essentially, by considering this scenario at each warehouse, we can determine the optimal shipments. To consider each scenario, we recurse on the two scenarios at each warehouse. In one recurse, we simply skip the warehouse and our order remains the same. In the other scenario, we use the current warehouse's inventory and reflect those changes in our order before recursing further. We then simply have to choose the shipments with the fewest warehouses at each step and we will end up with our optimal solution.

## Testing

I used Jest to unit test my 'allocate' function.

To run the tests:

1. npm install
2. npm run test

The 'test' script will run Jest and run the testcases defined under 'testcases.js'.
Each test will output a description of the case being handled as well as the result of the test (passed/failed).
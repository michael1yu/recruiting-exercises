# Solution

## Explanation

I use a greedy algorithm to approach the solution. Since as we progress through the warehouses our shipment cost increases, the optimal solution is if we ship as much as possible from the early warehouses. As a result, at each warehouse, I deplete the inventory as much as possible to ship as much of the orders as possible. This ensures that I am taking advantage of the cheaper shipping cost of the early warehouses. By making this decision at each warehouse, I can generate the cheapest overall way an order can be shipped.

## Testing

I used Jest to unit test my "allocate" function.

To run the tests:

1. npm install
2. npm run test

The 'test' script will run Jest and run the testcases defined under 'testcases.js'.
Each test will output a description of the case being handled as well as the result of the test (passed/failed).
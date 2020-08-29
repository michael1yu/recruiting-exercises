const { allocate } = require('./InventoryAllocator');
const testcases = require('./testcases');

// load external testcases and map to assertions
testcases.map((testcase) =>
    test(testcase.desc, () => {
        expect(allocate(testcase.order, testcase.wh)).toEqual(testcase.expected);
    })
);

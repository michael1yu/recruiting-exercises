let cases = [
    {
        desc: 'single warehouse, order should be fulfilled',
        order: { apple: 1 },
        wh: [{ name: 'owd', inventory: { apple: 1 } }],
        expected: [{ owd: { apple: 1 } }],
    },
    {
        desc: 'multiple warehouses, order should be fulfilled',
        order: { apple: 10 },
        wh: [
            { name: 'owd', inventory: { apple: 5 } },
            { name: 'dm', inventory: { apple: 5 } },
        ],
        expected: [{ dm: { apple: 5 } }, { owd: { apple: 5 } }],
    },
    {
        desc: 'not enough inventory, order should not be fulfilled',
        order: { apple: 1 },
        wh: [{ name: 'owd', inventory: { apple: 0 } }],
        expected: [],
    },
    {
        desc: 'no order, order is fulfilled with empty array',
        order: {},
        wh: [
            { name: 'owd', inventory: { apple: 5 } },
            { name: 'dm', inventory: { apple: 5 } },
        ],
        expected: [],
    },
    {
        desc: 'negative order, order should not be fulfilled',
        order: { apple: 2, banana: -1 },
        wh: [
            { name: 'owd', inventory: { apple: 5, banana: 5 } },
            { name: 'dm', inventory: { apple: 5 } },
        ],
        expected: [],
    },
    {
        desc: 'signicant inventory surplus, order should be fulfilled by only one warehouse',
        order: { apple: 5, banana: 100, orange: 20 },
        wh: [
            { name: 'owd', inventory: { apple: 3, banana: 50, orange: 19 } },
            { name: 'dm', inventory: { apple: 500, banana: 10000, orange: 10000 } },
        ],
        expected: [{ dm: { apple: 5, banana: 100, orange: 20 } }],
    },
    {
        desc: 'multiple warehouses work, order should be fulfilled by the earliest',
        order: { apple: 2000, banana: 500, orange: 500 },
        wh: [
            { name: 'owd', inventory: { apple: 500, banana: 500, orange: 500 } },
            { name: 'dm', inventory: { apple: 2000, banana: 500, orange: 500 } },
            { name: 'ny', inventory: { apple: 500, banana: 500, orange: 500 } },
            { name: 'ca', inventory: { apple: 20000, banana: 500, orange: 500 } },
        ],
        expected: [{ dm: { apple: 2000, banana: 500, orange: 500 } }],
    },
    {
        desc: 'multiple sets of warehouses work, order should be fulfilled by the earliest set',
        order: { apple: 2000, banana: 250, orange: 120, cherry: 50 },
        wh: [
            { name: 'owd', inventory: { apple: 500, banana: 500, orange: 500 } },
            { name: 'dm', inventory: { apple: 250, banana: 500, orange: 500 } },
            { name: 'ny', inventory: { apple: 1800, banana: 500, orange: 500, cherry: 120 } },
            { name: 'ca', inventory: { apple: 20000, banana: 500, orange: 500, cherry: 25 } },
        ],
        expected: [{ ny: { apple: 1500, cherry: 50 } }, { owd: { apple: 500, banana: 250, orange: 120 } }],
    },
    {
        desc: 'all warehouses are required, order should be fulfilled by all warehouses',
        order: { apple: 2000, banana: 250, orange: 120, cherry: 50 },
        wh: [
            { name: 'owd', inventory: { apple: 500, banana: 500, orange: 500, cherry: 0 } },
            { name: 'dm', inventory: { apple: 250, banana: 500, orange: 500 } },
            { name: 'ny', inventory: { apple: 250, banana: 500, orange: 500, cherry: 25 } },
            { name: 'ca', inventory: { apple: 1000, banana: 500, orange: 500, cherry: 25 } },
        ],
        expected: [
            {ca: {apple: 1000, cherry: 25}},
            {dm: {apple: 250}},
            {ny : {apple: 250, cherry: 25}},
            {owd: {apple: 500, banana: 250, orange: 120}}
        ]
    },
    {
        desc: 'one under the order required, order should not be fulfilled',
        order: {apple: 2001, banana: 250, orange: 120, cherry: 50},
        wh: [
            { name: 'owd', inventory: { apple: 500, banana: 500, orange: 500, cherry: 0 } },
            { name: 'dm', inventory: { apple: 250, banana: 500, orange: 500 } },
            { name: 'ny', inventory: { apple: 250, banana: 500, orange: 500, cherry: 25 } },
            { name: 'ca', inventory: { apple: 1000, banana: 500, orange: 500, cherry: 25 } },
        ],
        expected: []
    },
    {
        desc: 'one item with 0 count that none of the warehouses have, order should be fulfilled',
        order: {apple: 2000, banana: 250, orange: 120, cherry: 50, strawberry: 0},
        wh: [
            { name: 'owd', inventory: { apple: 500, banana: 500, orange: 500, cherry: 0 } },
            { name: 'dm', inventory: { apple: 250, banana: 500, orange: 500 } },
            { name: 'ny', inventory: { apple: 250, banana: 500, orange: 500, cherry: 25 } },
            { name: 'ca', inventory: { apple: 1000, banana: 500, orange: 500, cherry: 25 } },
        ],
        expected: [
            {ca: {apple: 1000, cherry: 25}},
            {dm: {apple: 250}},
            {ny : {apple: 250, cherry: 25}},
            {owd: {apple: 500, banana: 250, orange: 120}}
        ]
    }
];

module.exports = cases;

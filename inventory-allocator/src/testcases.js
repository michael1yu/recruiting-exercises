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
        order: {apple: 2, banana: -1},
        wh: [
            { name: 'owd', inventory: { apple: 5, banana: 5 } },
            { name: 'dm', inventory: { apple: 5 } },
        ],
        expected: [],
    },
];

module.exports = cases;

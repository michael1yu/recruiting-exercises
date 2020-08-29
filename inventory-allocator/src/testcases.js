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
        expected: []
    }
];

module.exports = cases;

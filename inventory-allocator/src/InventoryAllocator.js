// recurse the possible choices
let recurse = (order, wh, index, shipments) => {
    // empty order return []
    if (Object.keys(order).length == 0) return [];
    // no warehouses return []
    if (wh.length == 0) return [];

    let fulfilled = true;

    // determine if order has been fulfilled
    for (let key in order) {
        if (order[key] > 0) {
            fulfilled = false;
            break;
        }
    }

    // if at last warehouse and order hasn't been fulfilled, then the current shipments aren't possible
    if (index == wh.length && !fulfilled) {
        // explored all warehouses and still was not able to fulfill
        return [];
    }

    // order has been fulfilled, successfull shipments
    if (fulfilled) {
        return shipments; // successfull fulfillment
    }

    let cont = { ...order }; // order values if we ship from the current warehouse
    let sk = { ...order }; // order values if we skip the current warehouse
    let warehouse = wh[index];
    let inventory = warehouse['inventory'];
    let contCurrShipment = {}; // hold shipment for if we use the current warehouse

    // iterate through order and determine the amount remaining after visiting current warehouse
    for (let key in cont) {
        let count = cont[key];
        if (count === 0) continue; // no order left, skip
        if (count < 0) {
            contCurrShipment = {};
            break;
        } // if negative count no possible way to fulfill order

        if (inventory[key] && inventory[key] > 0) {
            shipWithWh = true;
            let use = inventory[key] > count ? count : inventory[key]; // determine how much we are going to use from the warehouse
            cont[key] -= use; // update remaining order that needs to be fulfilled
            contCurrShipment[key] = use; // update shipment
        }
    }

    // get shipments if we use the current warehouse
    // if the current fulfillment fails, we want to skip the warehouse (a case which is recursed by skRes)
    let contRes = Object.keys(contCurrShipment).length == 0 ? [] : recurse(cont, wh, index + 1, [...shipments, { [warehouse['name']]: contCurrShipment }]);

    // get shipments if we skip the current warehouse
    let skRes = recurse(sk, wh, index + 1, shipments);

    // handle case where the fulfillment was not possible (either skip or cont failed)
    if (skRes.length == 0 && contRes.length == 0) return [];
    if (skRes.length == 0) return contRes;
    if (contRes.length == 0) return skRes;

    // return the one that required fewer warehouses (if equal return the earlier one)
    return skRes.length >= contRes.length ? contRes : skRes;
};

// determine best shipping order
// return val [] indicates that the order cannot be shipped
let allocate = (order, wh) => {
    let shipment = recurse(order, wh, 0, []); // hold our shipping instructions

    // based on output on github, I assume that output should be sorted alphabetically based on warehouse name
    shipment.sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));
    return shipment;
};

module.exports = { allocate };

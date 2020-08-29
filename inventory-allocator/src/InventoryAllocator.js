// determine best shipping order
// return val [] indicates that the order cannot be shipped
let allocate = (order, wh) => {
    let shipment = []; // hold our shipping instructions
    for (let i = 0; i < wh.length; i++) {
        let warehouse = wh[i];
        let inventory = warehouse['inventory'];

        // track whether the current warehouse is used to ship from
        let shipWithWh = false;
        let currShipment = {};

        // greedily fulfill order
        // visit each warehouse and use the max inventory possible since it gets more expensive to ship as we traverse each warehouse
        for (let key in order) {
            let count = order[key];
            if (count === 0) continue;
            if (inventory[key] && inventory[key] > 0) {
                shipWithWh = true;
                let use = inventory[key] > count ? count : inventory[key]; // determine how much we are going to use from the warehouse
                order[key] -= use; // update remaining order that needs to be fulfilled
                inventory[key] -= use; // update remaining inventory
                currShipment[key] = use; // update shipment
            }
        }
        if (shipWithWh) shipment.push({ [warehouse['name']]: currShipment }); // add to list of shipments
    }
    
    // ensure that all orders were fulfilled
    for (let key in order) {
        let count = order[key];
        if (count > 0) return []; // order was not fulfilled, return []
    }

    // based on output on github, I assume that output should be sorted alphabetically based on warehouse name
    shipment.sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));
    return shipment;
};

module.exports = { allocate };

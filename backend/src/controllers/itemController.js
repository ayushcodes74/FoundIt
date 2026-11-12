const Item = require("../models/Item");

async function createItem(req, res) {

    try {
        const data = req.body;
        const item = await Item.create(data);
        return res.status(201).json({

            message: "Item created successfully",
            item: item
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create item",
            error: error.message
        });
    }

}
module.exports = createItem;


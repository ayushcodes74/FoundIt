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

async function getItems(req, res) {
    try {
        const item = await Item.find();
        return res.status(200).json({
            message: "Item fetched successfully",
            items: item
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch item",
            error: error.message
        });
    }
}

async function getItemById(req, res) {
    try {
        const id = req.params.id;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        return res.status(200).json({
            message: "Item fetched successfully",
            item: item
        });


    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch item",
            error: error.message
        });
    }
}

async function updateItem(req, res) {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const item = await Item.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        return res.status(200).json({
            message: "Item updated successfully",
            item: item
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch item",
            error: error.message
        });
    }
}

async function deleteItem(req,res){
    try {
        const id = req.params.id;
        const item = await Item.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        return res.status(200).json({
            message: "Item deleted successfully",
            item: item
        });

    } catch (error) {
            return res.status(500).json({
            message: "Failed to fetch item",
            error: error.message
        });
    }
}
module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
};


const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema ({
    title: {
    type: String,
    required: true,
    trim: true
},
    description: {
        type: String,
        required: true,
    },
    type: {
    type: String,
    enum: ["lost", "found"],
    required: true
},

    category: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        required: true,
    },

    status: {
        type: String,
        enum: ["open", "resolved"],
    default: "open"
    },
    
},{
    timestamps: true
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
const express = require('express');

const cors = require("cors")
const app = express();
const itemRoutes = require("./routes/itemRoutes");
app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res) => {
    
    return res.json({
        "status": "ok"
    })
})
app.use("/api/items", itemRoutes);

module.exports = app;
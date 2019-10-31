const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
    tracking_number: {
        type: Number,
        default: 0
    }
});

const Package = mongoose.model("Package", PackageSchema);
module.exports = Package;

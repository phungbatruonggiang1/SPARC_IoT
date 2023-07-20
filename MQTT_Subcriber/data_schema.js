const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let dataStation = new Schema({
    topic: {
        type: String
    },
    time: {
        type: Number,
        require:true
    },
    content: {
        type: Object
    }
});

// Export the model
module.exports = mongoose.model('datastation', dataStation);
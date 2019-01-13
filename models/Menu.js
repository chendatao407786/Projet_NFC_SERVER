const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const menuSchema = new Schema({
    courses : [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

module.exports = Menu = mongoose.model('Menu', menuSchema);
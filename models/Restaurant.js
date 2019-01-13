const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
    restaurantName : {
        type: String,
        required:true
    },
    restaurantAddress : {
        type: String,
        required: true,
    },
    restaurantTelephone : {
        type: String,
        required: true
    },
    restaurantMenu:{
        type:Schema.Types.ObjectId,
        ref: 'Menu'
    }
})

module.exports = Restaurant = mongoose.model('Restaurant', restaurantSchema);
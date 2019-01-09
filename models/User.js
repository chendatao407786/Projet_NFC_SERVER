const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // commands: [{
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Command'
    // }]
    
})

module.exports = User = mongoose.model('User', UserSchema);
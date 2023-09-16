const mongoose = require('mongoose');

const patient = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    condition: {
        type: String,
    },
    note: {
        type: String
    }
});
module.exports = mongoose.model('Patients', patient);

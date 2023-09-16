const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employe = new Schema({
    link: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true

    },
    adress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    position: {
        type: String,
        required: true,
        positions: ['Doctor' /*Médecin*/, 'Nurse' /*Infirmier*/, 'Administrator'/*Administrateur*/, 'Janitor'/*Agent d'entretien*/, 'Receptionist'/*Réceptionniste*/]
    },
    department: {
        type: String,
        required: true,
    },
    note: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: ""
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Employes', employe)
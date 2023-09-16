const express = require('express');
const { addNewPatient, addNewAppointments } = require('../controllers/Receptionist/receptionist.controllers');
const { isAuthenticated, onlyReceptionist } = require('../middlewares/isAuth');

const Router = express.Router();

// is available  only for Receptionist employee
Router.post('/patient/register', isAuthenticated, onlyReceptionist, addNewPatient)
Router.post('/appointments/new', isAuthenticated, onlyReceptionist, addNewAppointments)

module.exports = Router


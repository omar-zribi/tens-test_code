const express = require('express');

const { validateLogin } = require('../middlewares/allEmployee.validator');
const { logInEmploye, getProfilEmploye, getMyProfil } = require('../controllers/allEmployee.contollers');
const { isAuthenticated } = require('../middlewares/isAuth');

const Router = express.Router();

Router.post("/login", validateLogin, logInEmploye);
Router.get("/myprofil", isAuthenticated, getMyProfil);

module.exports = Router
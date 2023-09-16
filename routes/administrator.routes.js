const express = require('express');

const { validateRegister } = require('../middlewares/administrator.validator');
const { registerNewEmploye, getProfilEmploye, getAllProfilEmploye, blockedEmploye } = require('../controllers/Administrator/administrator.contollers');
const { updateEmployeeSchema } = require('../controllers/Administrator/update.employeeschema');
const { isAuthenticated, onlyAdministrator } = require('../middlewares/isAuth');


const Router = express.Router();

//is available  only for Administrator employee
Router.post("/employee/register", isAuthenticated, onlyAdministrator, validateRegister, registerNewEmploye);
Router.post("/allemployee/update", isAuthenticated, onlyAdministrator, updateEmployeeSchema);
Router.get("/employee/profil", isAuthenticated, onlyAdministrator, getProfilEmploye);
Router.get("/allemployee/allprofils", isAuthenticated, onlyAdministrator, getAllProfilEmploye);
Router.get("/employee/blocked", isAuthenticated, onlyAdministrator, blockedEmploye);

module.exports = Router
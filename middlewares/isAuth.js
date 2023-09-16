const Employe = require('../models/employe.model');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('config').get('JWT_SECRET')


exports.isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
       
        const decoded = jwt.verify(token, JWT_SECRET);
        const employe = await Employe.findById(decoded._id);
        if (!employe) {
            res.status(404).json({ error: "not authorized" });
        } else {
            req.employe = employe;
        }
        next();
    } catch (error) {
        res.status(505).json({ error: error.message });
    }
};
exports.onlyDoctor = async (req, res, next) => {
    try {
        req.employe && req.employe.position === 'Doctor'
            ?
            next()
            :
            res.status(404).json({ error: "not authorized" });
    } catch (error) {
        res.status(505).json({ error: error.message });
    }
};
exports.onlyNurse = async (req, res, next) => {
    try {
        req.employe && req.employe.position === 'Nurse'
            ?
            next()
            :
            res.status(404).json({ error: "not authorized" });
    } catch (error) {
        res.status(505).json({ error: error.message });
    }
};
exports.onlyAdministrator = async (req, res, next) => {
    try {
        req.employe && req.employe.position === 'Administrator'
            ?
            next()
            :
            res.status(404).json({ error: "not authorized" });
    } catch (error) {
        res.status(505).json({ error: error.message });
    }
};
exports.onlyJanitor = async (req, res, next) => {
    try {
        req.employe && req.employe.position === 'Janitor'
            ?
            next()
            :
            res.status(404).json({ error: "not authorized" });
    } catch (error) {
        res.status(505).json({ error: error.message });
    }
};
exports.onlyReceptionist = async (req, res, next) => {
    try {
        req.employe && req.employe.position === 'Receptionist'
            ?
            next()
            :
            res.status(404).json({ error: "not authorized" });
    } catch (error) {
        res.status(505).json({ error: error.message });
    }
};
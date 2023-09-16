const { validationResult, query } = require('express-validator');
const departments = require('config').get("departments")


exports.validateRegister = [
    query('firstName').notEmpty().withMessage("le prénom de nouveau employé est requise"),
    query('lastName').notEmpty().withMessage("le nom de nouveau employé est requis"),
    query('adress').notEmpty().withMessage("l'adress de nouveau employé est requis"),
    query('phoneNumber').notEmpty().withMessage("le numéro de téléphone de nouveau employé est requis"),
    query('position').notEmpty().withMessage("le poste  de nouveau employé est requis"),
    async (req, res, next) => {
        if (query('position') !== "Administrator") { query('department').notEmpty().withMessage("le department de nouveau employé est requise") }
        !validationResult(req).isEmpty()
            ?
            res.status(400).json({ error: validationResult(req).errors.map((el) => el) })
            :
            req.query.position !== "Administrator"
                &&
                departments.includes(req.query.department) === false
                ?
                res.status(400).json({ error: "merci de verifier votre departement" })
                :
                next();
    },
];
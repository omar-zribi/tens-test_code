const { validationResult, query } = require('express-validator');

exports.validateLogin = [
    query('link').notEmpty().withMessage("login parametre d'employé est requise"),
    query('password').notEmpty().withMessage("le mot de passe d'employé est requis"),
    async (req, res, next) => {
        if (query('newPassword')) {
            query('newPassword').isLength({ min: 6 }).withMessage("Le mot de passe doit comporter au moins 6 caractères");
            query('confirmNewPassword').notEmpty().withMessage("La confirmation du mot de passe est requise");
        }
        !validationResult(req).isEmpty()
            ?
            res.status(400).json({ error: validationResult(req).errors.map((el) => el) })
            :
            next();
    },
];
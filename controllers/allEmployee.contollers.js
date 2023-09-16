const Employe = require('../models/employe.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('config').get('JWT_SECRET')

exports.logInEmploye = async (req, res) => {
    const { link, password, newPassword, confirmNewPassword } = req.query;
    try {
        const employe = await Employe.findOne({ link: link });
        if (!employe) { return res.status(402).json({ error: `Compte introuvable. Veuillez vérifier vos identifiants et réessayer.` }); }
        const comparePassword = bcrypt.compareSync(password, employe.password);
        if (!comparePassword) { return res.status(402).json({ error: `Mot de passe incorrect. Veuillez vérifier votre mot de passe et réessayer.` }) }
        if (employe.isActive === false && newPassword!==''&& newPassword === confirmNewPassword) {
            employe.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
            employe.isActive = true;
            employe.note = employe.note + `\n` + `New ${employe.position} is active \n New ${employe.position} hase been created password \n account active at: ${new Date().toISOString()}`
        }
        if (employe.isActive === false && newPassword !== confirmNewPassword) { return res.status(402).json({ error: `Mot de passe incorrect. Veuillez vérifier votre mot de passe et réessayer.` }) }
        employe.token = jwt.sign({ link: employe.link, _id: employe._id }, JWT_SECRET);
        await employe.save();
        res.status(200).json({
            message: 'success login',
            employe: employe,
        })
    } catch (error) {
        res.status(502).json({ error: error.message })
    }
}

exports.getMyProfil = async (req, res) => {
    const employe = req.employe;
    const { link } = req.query
    try {
        if (employe.link !== link) {
            return res.status(404).json({ error: "Not authorized" })
        }
        res.status(200).json({
            message: 'success get my profil',
            employe: employe,
        })
    } catch (error) {
        res.status(502).json({ error: error.message })
    }
}

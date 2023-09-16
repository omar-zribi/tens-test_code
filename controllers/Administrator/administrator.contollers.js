const Employe = require('../../models/employe.model');
const bcrypt = require('bcrypt');
const { createUniqueLink } = require('./others.controllers');


exports.registerNewEmploye = async (req, res) => {
    const { firstName, lastName, adress, phoneNumber, position, department } = req.query;
    const Administrator = req.employe
    try {
        const employe = await Employe.findOne({ phoneNumber: phoneNumber });
        if (employe) { res.status(403).json({ error: "Employee already exists" }) }
        else {
            const newEmploye = new Employe({ firstName, lastName, adress, phoneNumber, position })
            newEmploye.position === 'Administrator' ? newEmploye.department = position : newEmploye.department = department;
            newEmploye.link = await createUniqueLink({ firstName: newEmploye.firstName, lastName: newEmploye.lastName, position: newEmploye.position, department: newEmploye.department });
            newEmploye.password = await bcrypt.hash(newEmploye.link, await bcrypt.genSalt(10));
            newEmploye.note = `New ${newEmploye.position} added by ${Administrator._id} \n date of added new ${newEmploye.position}: ${new Date().toISOString()}`
            await newEmploye.save();
            res.status(200).json({
                message: "Success adding new employee",
                employee: newEmploye
            })
        }
    } catch (error) {
        res.status(502).json({ error: error.message })
    }
}
exports.getProfilEmploye = async (req, res) => {
    const { link, _id } = req.query
    try {
        let employe
        !employe && link && link !== null
            ?
            employe = await Employe.findOne({ link: link })
            :
            !employe && _id && _id !== null
                ?
                employe = await Employe.findById(_id)
                :
                null;
        if (!employe) { return res.status(404).json({ error: 'account  not Found' }); }


        res.status(200).json({
            message: 'success get profil',
            employe: employe,
        })
    } catch (error) {
        res.status(502).json({ error: error.message })
    }
}
exports.getAllProfilEmploye = async (req, res) => {
    try {
        const allEmploye = await Employe.find();
        res.status(200).json({
            message: 'success get all profils',
            employe: allEmploye,
        })
    } catch (error) {
        res.status(502).json({ error: error.message })
    }
}
exports.blockedEmploye = async (req, res) => {
    const employe = req.employe;
    const { link } = req.query
    try {
        const existingEmploye = await Employe.findOne({ link: link })
        if (!existingEmploye) { return res.status(402).json({ error: `Compte introuvable. Veuillez vérifier le lien de l'employee et réessayer.` }); }
        if (existingEmploye && existingEmploye.isBlocked === true) { return res.status(402).json({ error: `ce compte est déjà bloqué.` }); }
        else {
            existingEmploye.isBlocked = true;

            existingEmploye.note = existingEmploye.note + '\n' + `this account is blocked by ${employe._id} à: ${new Date().toISOString()}`;
            res.status(200).json({
                message: 'success get profil',
                employe: employe,
            })
        }
    } catch (error) {
        res.status(502).json({ error: error.message })
    }
}

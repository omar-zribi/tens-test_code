const Employe = require('../../models/employe.model');

exports.createUniqueLink = async (newEmploye) => {
    let uniqueLink = await `${newEmploye.position}_${newEmploye.department}_${newEmploye.firstName}_${newEmploye.lastName}`.replaceAll(' ', '').toLowerCase()
    let allEmploye = await Employe.countDocuments({ link: uniqueLink });
    if (allEmploye === 0) {
        return uniqueLink
    }
    else {
        let counter = 1;
        while (await Employe.countDocuments({ link: uniqueLink }) !== 0) {
            uniqueLink = await `${newEmploye.position}_${newEmploye.department}_${counter}_${newEmploye.firstName}_${newEmploye.lastName}`.replaceAll(' ', '').toLowerCase();
            counter++;
        }
        return uniqueLink
    }
}
const Employe = require('../../models/employe.model');
const bcrypt = require('bcrypt');


exports.updateEmployeeSchema = async (req, res) => {
    try {
        const allEmploye = await Employe.find();

        for (let i = 0; i < allEmploye.length; i++) {
            if (!allEmploye[i].isActive) {
                allEmploye[i].isActive = false;
            }

            if (!allEmploye[i].password) {
                allEmploye[i].password = await bcrypt.hash(allEmploye[i].link, await bcrypt.genSalt(10));
            }

            if (!allEmploye[i].token) {
                allEmploye[i].token='';
            }
            if (!allEmploye[i].isBlocked) {
                allEmploye[i].isBlocked=false;
            }

            await allEmploye[i].save();
        }
        res.status(200).json({
            message: "all employees schema are updated successfully",
            employee: allEmploye.map(el => el)
        })
    } catch (error) {
        res.status(402).json({ error: error.message })
    }
}


const Employe = require('../../models/employe.model');
const Patient = require('../../models/patient.model');
const Schedule = require('../../models/schedule.model');


exports.addNewPatient = async (req, res) => {
    const employe = req.employe
    const { fullName, phoneNumber, age, gender, condition, admittedDate, admittedBy, dischargeDate, assignedDoctor } = req.query;
    try {
        const existingPatient = await Patient.findOne({ phoneNumber: phoneNumber })
        if (existingPatient) { return res.status(402).json({ error: 'patient already exists' }) }
        else {
            const patient = await new Patient({ fullName, phoneNumber, age, gender, condition, admittedDate, admittedBy, dischargeDate, assignedDoctor })
            patient.note = `New ${patient.fullName} added by ${employe._id} \n date of added: ${new Date().toISOString()}`
            patient.link = `${patient.fullName}_${patient._id}`;
            await patient.save();
            res.status(200).json({
                message: 'Added patient successfully',
                patient: patient
            })
        }
    } catch (error) {
        res.status(502).json({ error: error.message })
    }
}
exports.addNewAppointments = async (req, res) => {
    const employe = req.employe;
    const { ptLink, drLink, date, time } = req.query;
    try {
        const doctor = await Employe.findOne({ link: drLink })
        if (!doctor) { return res.status(403).json({ error: 'Doctor not found' }) };
        const patient = await Patient.findOne({ link: ptLink })
        if (!patient) { return res.status(402).json({ error: 'Patient not found' }) };
        let schedule
        if (doctor && patient) {
            schedule = await Schedule.findOne({ link: `${drLink}_${ptLink}` })

            if (!schedule) {
                schedule = new Schedule({ ptLink, drLink, date, time });
                schedule.link = `${drLink}_${ptLink}`;
                schedule.DoctorFullName = `${doctor.firstName} ${doctor.lastName}`;
                schedule.DoctorLink = doctor.link;
                schedule.department = doctor.department;
                const newSchedule = {
                    patient: patient.fullName,
                    date: date,
                    time: time,
                }
                schedule.appointments.push(newSchedule)
                patient.note = patient.note + ` ` + `${patient.fullName} made an appointment with dr.${doctor.firstName} ${doctor.firstName}`
                    + ` ` + `this appointment is created by ${employe._id} ` + ` ` + `Date appointment: ${newSchedule.date}` + ` ` + `Time appointment: ${newSchedule.time}`;
                await schedule.save();
                await patient.save();
                return res.status(200).json({
                    message: 'added schedule successfully',
                    schedule: schedule
                })
            };
            if (schedule) {
                const newSchedule = {
                    patient: patient.fullName,
                    date: date,
                    time: time,
                }
                schedule.appointments.push(newSchedule)
                patient.note = patient.note + ` ` + `${patient.fullName} made an appointment with dr.${doctor.firstName} ${doctor.firstName}`
                    + ` ` + `this appointment is created by ${employe._id} ` + ` ` + `Date appointment: ${newSchedule.date}` + ` ` + `Time appointment: ${newSchedule.time}`;
                await schedule.save();
                await patient.save();
            }
            return res.status(200).json({
                message: 'added schedule successfully',
                schedule: schedule
            })
        }
    } catch (error) {
        res.status(502).json({ error: error.message })
    }
}
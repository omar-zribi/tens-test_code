const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schedule = new Schema({
    link:{
        type:String,
        required:true
    },
    DoctorFullName: {
        type: String,
        required: true
    },
    DoctorId:{
        type:String,
        required:true
    },
    department: {
        type: String,
        required: true,
    },
    appointments: {
        type: Array,
        default: [],
        required: true
    }
});
module.exports = mongoose.model('Schedule', schedule)
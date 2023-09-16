const mongoose = require('mongoose');

module.exports = connectDB = async () => {
    try {
        await mongoose.connect(require('config').get('URL_DATABASE'))
        console.log(`data base is connected\nName data base: ${require('config').get('NAME_DATABASE')}`)
    } catch (error) {
        alert(`dataBase can not be connected\nError=${error.message}`)
    }
}
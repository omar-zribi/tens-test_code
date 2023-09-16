const express = require("express");
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const app = express();
const connectDB = require('./connectDB');

// mongodb
connectDB();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/api/administrator", require("./routes/administrator.routes"));
app.use("/api/receptionist", require("./routes/receptionist.routes"));
app.use("/api", require("./routes/allEmployee.routes"));

//PORT
const port = process.env.SERVER_PORT || 6006;
//STARTING A SERVER
console.clear();
app.listen(port, (error) => {
    error ?
        console.log(`Error in the server.\nerror: ${error.message}`)
        :
        console.log(`Server is running.\nport: ${port}`)
})
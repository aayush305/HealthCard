const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const multer = require("multer");
const cookieParser = require("cookie-parser");
const chemist = require("./schemas/chemist");
const lab = require("./schemas/lab");
const login = require("./schemas/login");
const doctor = require("./schemas//doctor");
const labtest = require("./schemas/labtest");
const user = require("./schemas/user");
const userRelatedRoutes = require("./routes/userRelatedRoutes");
const registerRoutes = require("./routes/registerRoutes");
const specialityRoutes = require("./routes/specialityRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const loginRoutes = require("./routes/loginRoutes");
const labroutes = require("./routes/labRoutes");
// const nJwt = require("njwt");
// const keys = require("./keyConfig");
//const doctor = require("./schemas/doctor");
const specialities = require("./schemas/speciality");
const dateFormater = require("date-format");

const labreport = require("./schemas/labreport");
//var nodemailer = require('nodemailer');
//var rn = require('random-number');
//app.use(cookieParser());
app.use(bodyparser.json());
var options = {
  min: 1000,
  max: 9999,
  integer: true
};
app.use("/api/user", userRelatedRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/speciality", specialityRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/lab", labroutes);
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/HealthCard", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log("Mongo connection error ", err));

//lab insertion

//get users email
//get email end
//upload file

//file upload ends
app.listen(8000, () => console.log("server is listening at 8000"));

const express = require("express");
const router = express.Router();
const doctor = require("./schemas//doctor");

app.post("/doctorExtraDetail", (req, res) => {
    console.log("Inside doctorExtraDetail");
    doctor
      .create({
        licence: req.body.licence,
        degree: req.body.degree,
        workPlace: req.body.work_place,
        workPlaceAdd: req.body.work_place_add,
        workPlaceContact: req.body.work_place_con,
        speciaities: req.body.specialities
      })
      .then(data => {
        console.log("Register Doctor Success" + data);
        res.status(200).json({
          success: true
        });
      })
      .catch(err => {
        console.log("Error in app.js register doctor:" + err);
        res.status(500).json({
          isSucceed: false
        });
      });
  });
  

module.exports = router;
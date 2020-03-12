const express = require("express");
const router = express.Router();
const multer = require("multer");
const diagnose = require("../schemas/diagnose");
const mkdirp = require('mkdirp')
const fs = require('fs')
const labreport = require('../schemas/labreport')
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const dir = "/home/mj/hackathon_new/Hackathon/server/lol"
    
  callBack(null,'upload')
  },
  filename: (req, file, callBack) => {
    callBack(null, `health_${file.originalname}`);
  }
});


const upload = multer({ storage: storage });
router.post('/upload/:userID/:labID', upload.array('files'), (req, res, next) => {
  console.log("upload::",req.files)
  console.log(req.params)
  const files = req.files;
  console.log(files);
  files.forEach(x => {
    console.log("In file")
    labreport.create({
      labid: req.params.labID,
      userid: req.params.userID,
      report: x.filename
    }).then(data => {
      console.log('ENtered successfully', data)
    })
  })
  if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send({sttus:  'ok'});
})

router.get("/getDiagnoses", (req, res) => {
  diagnose.find(
    { reportdNeeded: { $ne: null } },
    {
      symptoms: 1,
      reportdNeeded: 1,
      _id: 1,
      docId: 1,
      prescriptionId: 1,
      treatmentDesc: 1,
      userId: 1
    },
    (err, docs) => {
      if (err) {
        res.status(200).json({
          ok: false
        });
        console.log("ERR", err);
      }
      if (docs) {
        res.status(200).json({
          ok: true,
          docs: docs
        });
        console.log("DOCS", docs);
      }
    }
  );
});


router.post('/helloworld', (req, res) => {
  console.log('Hello World')
})

module.exports = router;

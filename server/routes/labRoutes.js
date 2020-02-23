const express = require("express");
const router = express.Router();
const multer = require("multer");
const labreport = require("../schemas/labreport");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "upload");
  },
  filename: (req, file, callBack) => {
    callBack(null, `health_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post("/upload/:userid", upload.array("files"), (req, res) => {
  const files = req.files;
  files.forEach(x => {
    console.log(x.filename);
    console.log("uSERID", req.params.userid);
    labreport
      .create({
        labid: "Not done yet",
        userid: req.params.userid,
        report: x.filename
      })
      .then(data => {});
  });
  //console.log(file.filename)
  if (!files) {
    console.log("error");
  } else {
    console.log("Doneeee");
  }
  res.send(files);
});

module.exports = router;

var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

let mon = mongoose.connect(
  "mongodb+srv://nguyenquoclong17112003:RVZ6O4jqdeXVUjbA@cluster0.fhwirq5.mongodb.net/baitap?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// create Collection
let sinhVienSchema = mongoose.Schema({
  maSinhVien: {
    type: String,
  },
  ngaySinh: {
    type: String,
  },
  gioiTinh: {
    type: String,
  },
  queQuan: {
    type: String,
  },
});

let sinhVien = mongoose.model("sinhVien", sinhVienSchema);

/* GET home page. */
router.get("/", function (req, res, next) {
  sinhVien.find({}, (err, data) => {
    res.render("index", { sinhviens: data });
  });
});

router.get("/form-add", function (req, res, next) {
  res.render("form-add", {});
});

router.post("/add", function (req, res, next) {
  sinhVien.create(req.body);
  res.redirect("/");
});

router.get("/form-update/:id", function (req, res, next) {
  sinhVien.findById(req.params.id, (err, data) => {
    res.render("form-update", { sinhvien: data });
  });
});

router.post("/update", function (req, res, next) {
  sinhVien.findByIdAndUpdate(req.body.id, req.body, (error, data) => {
    res.redirect("/");
  });
});

router.get("/form-delete/:id", function (req, res, next) {
  sinhVien.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect("/");
  });
});

module.exports = router;

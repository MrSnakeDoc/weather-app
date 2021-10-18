const express = require("express");
const router = express.Router();
const controllers = require("./controllers/controllers");
module.exports = router;
router.use(express.static("./src/public"));

router.get("/", controllers.root);

router.get("/result", controllers.redirectCity);

router.get("/city/:city", controllers.displayCity);
router.get("/contactus", (req, res) => {
  res.render("contactus");
});
router.get("/about", (req, res) => {
  res.render("about");
});

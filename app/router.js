const { Router } = require("express");
const controller = require("./controllers/controller.js");
const {
	validateBody,
	validateQuery,
} = require("./middlewares/validationMW.js");
const { bodySchema, querySchema } = require("./schemas");

const bodyValidation = validateBody(bodySchema);
const queryValidation = validateQuery(querySchema);

const router = Router();

router
	.get("/", controller.homePage)
	.post("/", controller.displayCity)
	.get("/contactus", (req, res) => {
		res.redirect("https://github.com/MrSnakeDoc");
	});

module.exports = router;

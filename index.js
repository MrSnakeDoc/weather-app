const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const session = require("express-session");
const { port, host, secret } = require("./app/config/");
const router = require("./app/router.js");
const bodySanitizer = require("./app/middlewares/bodySanitizer");

const app = express();

router.use(express.static("./app/public"));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: secret,
		resave: true,
		saveUninitialized: true,
		cookie: {
			secure: false,
			maxAge: 1000 * 60 * 60,
		},
	})
);

app.use(bodySanitizer);

app.use(router);
app.set("views", "./app/views");
app.set("view engine", "ejs");

app.listen(port, async () => {
	console.log(`Server is running on http://${host}:${port}`);
});

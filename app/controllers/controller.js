const axios = require("axios");
const data = require("../../data.json");
const dayjs = require("dayjs");
const { wkey, api, iconUrl } = require("../config/");

const controller = {
	async homePage(_, res) {
		let table = [];
		while (table.length < 6) {
			try {
				table.push(
					await controller.getCity(
						data[Math.floor(Math.random() * data.length)].capital
					)
				);
			} catch (error) {
				console.log(error);
				error.response.status === 404
					? table.push(
							await controller.getCity(
								data[Math.floor(Math.random() * data.length)].capital
							)
					  )
					: null;
			}
		}
		res.render("index", { table: table, urlIcon: iconUrl });
	},
	async getCity(param) {
		try {
			const path = `${api}${param}&appid=${wkey}&units=metric&lang=fr`;
			const result = await axios.get(path);
			return result.data;
		} catch (err) {
			console.log(err);
		}
	},
	async displayCity(req, res) {
		try {
			const city = await controller.getCity(req.body.city);
			city.sys.sunrise = dayjs(
				new Date(city.sys.sunrise * 1000).toLocaleString()
			).format("HH:mm:ss");
			city.sys.sunset = dayjs(
				new Date(city.sys.sunset * 1000).toLocaleString()
			).format("HH:mm:ss");
			city === undefined
				? res.redirect("/error")
				: res.render("city", {
						city,
						urlIcon: iconUrl,
				  });
		} catch (err) {
			console.log(err);
		}
	},
	async getForecast(param) {
		try {
			const result = await axios.get(
				`http://api.openweathermap.org/data/2.5/forecast?q=${param}&appid=${wkey}&units=metric&lang=fr`
			);
			return result.data;
		} catch (err) {
			console.log(err.message);
		}
	},
};

module.exports = controller;

const axios = require("axios");
const config = require("../config");
const data = require("../../data.json");
const routes = {
  async root(req, res) {
    let table = [];
    while (table.length < 6) {
      try {
        table.push(
          await routes.getCity(
            data[Math.floor(Math.random() * data.length)].capital
          )
        );
      } catch (error) {
        error.response.status === 404
          ? table.push(
              await routes.getCity(
                data[Math.floor(Math.random() * data.length)].capital
              )
            )
          : null;
      }
    }
    res.render("index", { table: table, urlIcon: config.iconUrl });
  },
  async getCity(city) {
    let api = `${config.api}${city}&appid=${config.wkey}&units=metric&lang=fr`;
    return await axios.get(api).then((res) => {
      return res.data;
    });
  },
  async redirectCity(req, res) {
    res.redirect(`/city/${req.query.search}`);
  },
  async displayCity(req, res) {
    let city;
    try {
      city = await routes.getCity(decodeURI(req.params.city));
    } catch (error) {
      error.response.status === 404 ? (city = null) : (city = null);
    }
    city === null
      ? res.status(200).redirect("/")
      : res.status(200).render("city", {
          city: city,
          urlIcon: config.iconUrl,
        });
  },
};

module.exports = routes;

module.exports = {
	host: process.env.HOST || "localhost",
	port: process.env.PORT || 8080,
	wkey: process.env.WKEY,
	api: process.env.API || "http://api.openweathermap.org/data/2.5/weather?q=",
	iconUrl: process.env.ICON || "http://openweathermap.org/img/w/",
	secret: process.env.SECRET,
};

({
	name: "almond",
	include: "app",
	wrap: true,
	out: "gw2-wikitips.js",

	baseUrl: "lib",
	paths: {
		almond: "../node_modules/almond/almond",
		app: "../app",
		jquery: "jquery-shim",
		qtip2: "qtip2-shim"
	},

	// node r.js -o build.js
})

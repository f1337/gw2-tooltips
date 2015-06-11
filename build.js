({
	name: "almond",
	include: "app",
	wrap: true,
	out: "gw2-wikitips.js",

	baseUrl: "lib",
	paths: {
		// requireLib: 'require',
		app: "../app",
		jquery: "jquery-shim",
		qtip2: "qtip2-shim"
	},

	// include: ["requireLib"]
	// node r.js -o baseUrl=. name=path/to/almond include=main out=main-built.js wrap=true
})

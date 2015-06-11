// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
	// cache-buster for development:
	// urlArgs: "cache-buster=" + Math.random(),
	baseUrl: "/js/lib",
	paths: {
		app: "../app",
		jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min",
		qtip2: "//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min"
	}
});

// Load the main app module to start the app
requirejs(["app/main"]);

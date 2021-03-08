(async function() {

	process.on("error", (error) => console.error(error));
        const path = require("path")
	const express = require("express");
	const MongoClient = require('mongodb').MongoClient;
	const axios = require("axios");
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		console.error('Missing MongoDB URI. Please add an environment variable named "MONGODB_URI".');
		process.exit(1);
	}
	const client = new MongoClient(uri, { useNewUrlParser: true });
	var app = express();
	await client.connect();

	const accounts = client.db("main").collection("accounts");
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
	

	// Needed to identify spammers
	function handleError(req, res, next){
		try {

		} catch(e) {
			return res.send({
				status: "error",
				code: 500,
				message: "Internal server error",
				informalMessage: "Looks like we got some boogies. We'll handle it.",
				error: JSON.parse(JSON.stringify(e))
			})
		}
	}
	function logIP(req, res, next) {
		console.log(`${req.ip} - ${Date.now()} - ${req.method} ${req.url}`);
		return next();
	}

	app.use(requireHTTPS);
	app.use(logIP);

	app.get("/callback/github/redirect-to/:url/", async (req, res) => {
		try {
		const accessToken = await axios({
			method: "POST",
			url: "https://github.com/login/oauth/access_token",
			params: {
				client_id: process.env.GITHUB_ID,
				client_secret: process.env.GITHUB_SECRET,
				code: req.query.code
			},
			headers: {"Accept":"application/json"}
		});
		
		const token = accessToken.data;
		
		const user = await axios({
			method:"GET",
			url: "https://api.github.com/user",
			headers: {"Authorization": `${token.token_type} ${token.access_token}`}
		});

		console.log(user);


		
		} catch(error){
			res.send(error);
		}
		

		
			})
app.get('/signup', (req, res) => {
	res.sendFile(path.join(__dirname, 'signup.html'))
})

app.use('/assets', express.static(path.join(__dirname, 'assets')));
	app.all("*", (req, res) => res.send({
		status: "error",
		code: 404,
		message: "Not found",
		informalMessage: "You found yourself in an unknown place."
	}))

	app.listen(3000, (o) => console.log("Server started"))
})();
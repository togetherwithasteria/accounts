(async function() {

	process.on("error", (error) => console.error(error));
	
	
	const slowDown = require("express-slow-down");
        const path = require("path");
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
  // The 'x-forwarded-proto' check is for reverse proxies
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
	app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});

//  apply to all requests
app.use(speedLimiter);

	
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
	}/*
	function logIP(req, res, next) {
		console.log(`${req.ip} - ${Date.now()} - ${req.method} ${req.url}`);
		return next();
	}
*/
	app.use(requireHTTPS);
	/*app.use(logIP);*/

  app.post('/signup', (req, res) => {
 
  })

app.get('/api/userExist', async (req, res) => {
	if(!req.query.user){
		return res.status(400).send({
		status: 'error',
		code: 400,
		message: 'Bad request',
                friendlyMessage: 'Add the username to the \'user\' URL parameter then we can talk.'
	})
	}
	
	var user = await accounts.findOne({'username': req.query.user});
	
	
		return res.status(200).send({
			status: 'success',
			code: 200,
			message: 'OK',
			data: {
			
				userExisted: (user ? true : false)
			}
			
		})

})

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


app.use('/', express.static(__dirname, {
extensions: ['html']
}));
	app.all("*", (req, res) => res.send({
		status: "error",
		code: 404,
		message: "Not found",
		friendlyMessage: "You found yourself in an unknown place."
	}))

	app.listen(3000, (o) => console.log("Server started"))
})();
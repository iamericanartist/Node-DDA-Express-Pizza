"use strict"

////////////////////////////////// SETTING UP //////////////////////////////////
// npm init
// npm install express pug --save

// LATER...
// npm install bower
// bower init --y
// node_modules/.bin/bower init
// touch .bowerrc
// node_modules/.bin/bower install bootstrap --save

// WAY LATER...
// npm install body-parser --save


//REQUIRES
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
//get port from environment and store in Express
const port = process.env.PORT || 3000
const chalk = require("chalk")
const { cyan, red } = require('chalk')

const routes = require("./routes/") // same as ./routes/index.js

//CONFIGURATION
app.set("port", port)
// sets engine to pug (which is already an engine)
app.set("view engine", "pug")


//middlewares (above routes always)
//ME TRYING
// app.use((req, res, next) => {
//   console.log(Date.now());
//   process.std("~~~ Request made to:", req.url);
//   console.log("~~~~", req.headers);
//   next()
// })
//SCOTTS
// app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
  // console.log(`[${new Date()}] "${cyan(`${method} ${url}`)}" "${agent}"`)
//SWANNS
app.use((req, res, next) => {
  console.log(`[${Date()}]`, chalk.cyan(`${req.method} ${req.url}`), req.headers['user-agent'])
  next()
})

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

app.locals.company = "Slyce of Lyfe"


// routes
app.use(routes)
// routes(app)


// Custom 404 page
app.use((req, res) =>
  res.render('404')
)


//ERROR HANDLING MIDDLEWARES (AFTER ALL ROUTES)
// app.use((err, req, res, next) => {
//   console.log(`[${Date()}]`, chalk.red(`${req.method} ${req.url}`), req.headers['user-agent'])
//   res.status(500).send('Internal Server Error - Unplug it and bring it back to Best Buy')
// })


// 404: Not Found Catch and pass to error handling middleware
app.use((req, res, next) => {
  // console.error("404")
  const err = Error("Not Found qwerty")
  err.status = 404
  next(err)
})

//ERROR HANDLING MIDDLEWARES ACTUAL
app.use((
    err,
    { method, url, headers: { 'user-agent': agent } },
    res,
    next
  ) => {
    res.sendStatus(err.status || 500)

    const timeStamp = new Date()
    const statusCode = res.statusCode
    const statusMessage = res.statusMessage

    console.error(
      `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
    )
    console.error(err.stack)
  }
)


// "app.locals.pretty" makes the terminal output of "curl localhost:3000" look like html
if (process.env.NODE_ENV !== "production"){
app.locals.pretty = true
}

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

/////////////////////////////// PORT ALTERNATIVES ///////////////////////////////
// const port = process.env.PORT || 3000  // set to either be PORT or default to 3000
// app.listen(port, () => {
// console.log("Express server listening on port 3000");
// })

// app.set("port",process.env.PORT || 3000)  // or you can use this more formally

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


//////////////////////////////////  REQUIRES  //////////////////////////////////
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const chalk = require("chalk")
const { cyan, red } = require('chalk')
const routes = require("./routes/") // same as ./routes/index.js

//get port from environment and store in Express
const port = process.env.PORT || 3000
app.set("port", port)

// sets engine to pug (which is already an engine)
app.set("view engine", "pug")


////////////////////////////////////  OTHER  ////////////////////////////////////
app.locals.company = "Slyce of Lyfe"

if (process.env.NODE_ENV !== "production"){
app.locals.pretty = true                    // "app.locals.pretty" makes the terminal output of "curl localhost:3000" look like html
}


/////////////////////////  MIDDLEWARES (Above Routes)  /////////////////////////
app.use((req, res, next) => {
  console.log(`[${Date()}]`, chalk.cyan(`${req.method} ${req.url}`), req.headers['user-agent'])
  next()
})

// ALTERNATE
// app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
//   const timeStamp = new Date()
//   console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
//   next()
// })

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))


//////////////////////////////////  ROUTES  ////////////////////////////////////
app.use(routes)


///////////////////////////////  CUSTOM 404 PAGE  ///////////////////////////////
app.use((req, res) =>
  res.render('404')
)


////////////////  ERROR HANDLING MIDDLEWARES (AFTER ALL ROUTES)  ////////////////
// app.use((err, req, res, next) => {
//   console.log(`[${Date()}]`, chalk.red(`${req.method} ${req.url}`), req.headers['user-agent'])
//   res.status(500).send('Internal Server Error - Unplug it and bring it back to Best Buy')
// })

// // 404: Not Found Catch and pass to error handling middleware
// app.use((req, res, next) => {
//   // console.error("404")
//   const err = Error("Not Found qwerty")
//   err.status = 404
//   next(err)
// })

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

///////////  Listen to requests on provided port, log when available  ///////////
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

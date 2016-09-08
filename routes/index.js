"use strict"

// const express = require('express')
const { Router } = require('express')  //Alt of above doesn't meed "express.router"
const router = Router()

// routes
router.get ("/", (req, res) =>                                                 //this is the route for INDEX "/"
  res.render("index", { message: "This is my Main page!"})                  //render this page
)

router.get ("/about", (req, res) =>                                            //this is the route for ABOUT
  res.render("about", { page: "About", message: "This is my About page."})  //render this page
)

router.get ("/contact", (req, res) =>                                          // this is the route for CONTACT
  res.render("contact", { page: "Contact", message: "Get a Contact HI!"})   // render this page
)

router.post ("/contact", (req, res) => {                                       // this is the POST route for CONTACT
  console.log(req.body)
    // res.render("contact", { page: "Contact", message: "HEY THERE!"})     // render this page
    // res.send("Thanks for stopping by")                                   // render this page
  res.redirect("/")
})

module.exports = router

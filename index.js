#!/usr/bin/env node

const [ , , port = 6666 ] = process.argv

const express = require(`express`)
const app = express()
const bodyParser = require(`body-parser`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// const basicAuth = require(`express-basic-auth`)
// app.use(
//   basicAuth({
//     authorizer: myAuthorizer
//   })
// )

let gusername
let gpassword
function myAuthorizer(username, password) {
  gusername = username
  gpassword = password
  return true
}

app.post(`/*`, (req, res) => {
  console.error(`POST ${req.originalUrl}: ${req.body}`)

  return res.send({
    headers: req.headers
    , params: req.params
    , query: req.query
    , originalUrl: req.originalUrl
    , body: req.body
    , hostname: req.hostname
    , ip: req.ip
    , method: req.method
    , path: req.path
    , protocol: req.protocol
    , isCachefresh: req.fresh
    , ips: req.ips
    , username: gusername
    , password: gpassword
  })
})
app.get(`/*`, (req, res) => {
  console.error(`GET ${req.originalUrl}: ${req.body}`)

  return res.send({
    headers: req.headers
    , params: req.params
    , query: req.query
    , originalUrl: req.originalUrl
    , body: req.body
    , hostname: req.hostname
    , ip: req.ip
    , method: req.method
    , path: req.path
    , protocol: req.protocol
    , isCachefresh: req.fresh
    , ips: req.ips
    , username: gusername
    , password: gpassword
  })
})

app.listen(port, () => {
  return console.log(`Echo Server running on port ${port}.`)
})

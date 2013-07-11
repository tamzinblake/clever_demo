/* global require */
var express = require('express')
  , https = require('https')

var app = express()

app.get('/v1.1/:route' ,function (req ,res) {
  var options = { hostname: 'api.getclever.com'
                , path: '/v1.1/' + req.params.route
                , auth: 'DEMO_KEY'
                }

  var callback = function (clever_response) {
    var data = ''
    clever_response.on('data' ,function (chunk) {
      data += chunk
    })
    clever_response.on('end' ,function () {
      var rv = data
      try {
        rv = JSON.parse(data)
      }
      catch (er) {
      }
      res.send(rv)
    })
  }

  https.get(options ,callback)
})

app.listen(8000)

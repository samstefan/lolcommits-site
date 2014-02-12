var path = require('path')
  , fs = require('fs')
  , join = path.join

module.exports.loadRoutes = function (serviceLocator, app) {

  // Index
  app.get('/', function(req, res){
    res.render('index', {
      page: 'index'
    })
  })

  // Post requests for commits..
  app.post('/get-commit', function(req, res){
    var img = req.files.photo
    console.log(img)
  })

}
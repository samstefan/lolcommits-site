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
    var img = req.files.path

    console.log('img:', img)
    fs.readFile(req.files.path, function (err, data) {
      var newPath = __dirname + '/uploads/uploadedFileName'
      fs.writeFile(newPath, data, function (err) {
        res.redirect('back')
      })
    })
  })



}
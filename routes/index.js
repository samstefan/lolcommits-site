var fs = require('fs')

module.exports.loadRoutes = function (serviceLocator, app) {

  // Index
  app.get('/', function(req, res){
    res.render('index', {
      page: 'index'
    })
  })

  // Post requests for commits
  app.post('/get-commit', function(req, res){
    fs.readFile(req.files.displayImage.path, function (err, data) {
      var newPath = __dirname + '/uploads/uploadedFileName'
      fs.writeFile(newPath, data, function (err) {
        res.redirect('back')
      })
    })

  })

}
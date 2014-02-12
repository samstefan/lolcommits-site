var path = require('path')
  , fs = require('fs')

module.exports.loadRoutes = function (serviceLocator, app) {

  // Index
  app.get('/', function(req, res){
    res.render('index', {
      page: 'index'
    })
  })

  // Post requests for commits..
  app.post('/get-commit', function(req, res){
    fs.readFile(req.files.file.path, function (err, data) {
      if (err) throw err;
      var newPath = path.normalize(__dirname + '/../public/uploads/') + data.name
      fs.writeFile(newPath, data, function (err) {
        if (err) throw err;
        console.log('Saved image.')
        res.redirect('Saved Image')
      })
    })
  })



}
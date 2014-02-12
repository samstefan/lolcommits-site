var path = require('path')
  , fs = require('fs')
  , uploadPath = path.normalize(__dirname + '/../public/uploads/')

module.exports.loadRoutes = function (serviceLocator, app) {

  // Index
  app.get('/', function(req, res){
    res.render('index', {
      page: 'index'
    , images: fs.readdirSync(uploadPath)
    })
  })

  // Post requests for commits..
  app.post('/get-commit', function(req, res){
    fs.readFile(req.files.file.path, function (err, data) {
      if (err) throw err;
      var newPath = uploadPath + req.files.file.name
      fs.writeFile(newPath, data, function (err) {
        if (err) throw err;
        console.log('Saved image.')
        res.json(
          { 'status': 'success'
          , 'message': 'Image Saved!'
          }
        )
      })
    })
  })

}
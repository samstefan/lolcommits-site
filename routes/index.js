var path = require('path')
  , fs = require('fs')
  , uploadPath = path.normalize(__dirname + '/../public/uploads/')

module.exports.loadRoutes = function (serviceLocator, app) {

  // Index
  app.get('/', function(req, res){
    res.render('index', {
      page: 'index'
    , images: fs.readdirSync(uploadPath).reverse()
    })
  })

  // Post requests for commits..
  app.post('/get-commit', function(req, res){
    var dateTaken = new Date(req.files.file.lastModifiedDate)
    fs.readFile(req.files.file.path, function (err, data) {
      if (err) throw err
      var newPath = uploadPath + dateTaken.toJSON() + '-' +  req.files.file.name
      fs.writeFile(newPath, data, function (err) {
        if (err) throw err;
        serviceLocator.logger.info('Saved image')
        res.json(
          { 'status': 'success'
          , 'message': 'Image Saved!'
          }
        )
      })
    })
  })

}
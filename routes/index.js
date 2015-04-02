var path = require('path')
  , fs = require('fs')
  , uploadPath = path.normalize(__dirname + '/../public/uploads/')
  , Slack = require('node-slack')
  , slack = new Slack('','')

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
      if (err) {
        serviceLocator.logger.error(err)
      } else {
        var newPath = uploadPath + dateTaken.toJSON() + '-' +  req.files.file.name
        fs.writeFile(newPath, data, function (err) {
          if (err) {
            serviceLocator.logger.error(err)
          } else {
            serviceLocator.logger.info('Saved image')
            res.json(
              { 'status': 'success'
              , 'message': 'Image Saved!'
              }
            )
            // Send file to slack
            slack.send({
              text: 'http://lol.samstefan.co.uk/uploads/' + dateTaken.toJSON() + '-' +  req.files.file.name,
              channel: '#lolcommits',
              username: 'LOL Commits'
            })
          }
        })
      }
    })
  })

}

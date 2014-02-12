module.exports.loadRoutes = function (serviceLocator, app) {

  // Index
  app.get('/', function(req, res){
    res.render('index', {
      page: 'index'
    })
  })

  // Post requests for commits.
  app.post('/get-commit', function(req, res){
    app.use(app.bodyParser({
      keepExtensions: true
    , uploadDir: __dirname + '/public/photos'
    }))
  })

}
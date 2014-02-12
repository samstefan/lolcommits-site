var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , serviceLocator = require('service-locator').createServiceLocator()
  , bunyan = require('bunyan')
  , app = express()

serviceLocator
  .register('logger', bunyan.createLogger({ name: 'lolcommits-site' }))

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

require('./routes').loadRoutes(serviceLocator, app)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})

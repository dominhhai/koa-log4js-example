var router = require('koa-router')()
var logger = require('koa-log4').getLogger('index')

router.get('/', function * (next) {
  logger.info('pre-render in index page')
  yield this.render('index', {
    title: 'Hello World Koa!'
  })
  logger.info('post-render in index page')
})

module.exports = router

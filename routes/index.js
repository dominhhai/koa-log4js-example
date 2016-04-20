const router = require('koa-router')()
const logger = require('koa-log4').getLogger('index')

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  }
  
  logger.info('pre-render index page')
  await ctx.render('index', {
  })
  logger.info('post-render index page')
})
module.exports = router

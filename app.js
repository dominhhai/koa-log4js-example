const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const views = require('koa-views')
const convert = require('koa-convert')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
// const logger = require('koa-logger')
var path = require('path')
const log4js = require('koa-log4')
const logger = log4js.getLogger('app')

const index = require('./routes/index')
const users = require('./routes/users')

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
// app.use(convert(logger()))
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))
app.use(convert(require('koa-static')(path.join(__dirname, 'public'))))

app.use(views(path.join(__dirname, 'views'), {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

router.use('/', index.routes(), index.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())

app.use(router.routes(), router.allowedMethods())
// response

app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app

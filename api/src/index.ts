import glob from 'glob'
import path from 'path'
import Mali, { Context } from 'mali'
import logger from '@malijs/logger'
import { loadSync } from '@grpc/proto-loader'

const { host = '0.0.0.0', port = 11000 } = process.env

const rootPath = path.resolve(process.cwd(), '../')
const protos = glob.sync(`${rootPath}/idl/**/*.proto`)
const packageDefinition = loadSync(protos, { includeDirs: [`${rootPath}/idl`] })

const app: Mali = new Mali(packageDefinition)

const helloworld = (ctx: Context) => {
  const { name } = ctx.req
  console.log('=== query string ===')
  console.log(name)
  ctx.res = { message: `${name} hello` }
  return ctx
}

// eslint-disable-next-line no-console
console.log('grpc server listening on %s, in %s port', host, port)

app.use({
  HelloWorldService: {
    HelloWorld: [helloworld],
  },
})

app.use(logger())
app.on('error', (err: Error, ctx: Context) => {
  // eslint-disable-next-line no-console
  console.error('server error for call %s of type %s', ctx.name, ctx.type, err)
})

app.start(`${host}:${port}`)

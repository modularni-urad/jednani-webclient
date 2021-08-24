const path = require('path')
const BS = require('browser-sync')
const bs = BS.create()
const SRC_DIR = path.resolve(path.join(__dirname, '../src'))
const DEV_DIR = path.resolve(__dirname)
const INDEX_DIR = path.resolve(__dirname + '/..')
const NODE_MODULES = path.resolve(path.join(__dirname, '../node_modules'))

function prepareApiServer () {
  const g = require('jednani-api/test/env/init')
  process.env.DATABASE_URL = 'db.sqlite'
  const InitModule = require('jednani-api/index')
  return g.InitApp(InitModule.default)
}

async function init () {  
  const apiServer = await prepareApiServer()

  bs.init({
    server: [ DEV_DIR, INDEX_DIR, NODE_MODULES ],
    port: 8080,
    open: false,
    ui: false,
    middleware: [{ route: '/api', handle: apiServer }]
  })
  bs.watch(DEV_DIR + '/index.html').on('change', bs.reload)
  bs.watch(SRC_DIR + '/**/*.js').on('change', function (filepath, file) {
    bs.reload(filepath)
  })
}
init()
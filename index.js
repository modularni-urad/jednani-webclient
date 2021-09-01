import { ROUTE_NAMES as NAMES } from './src/consts.js'
import { Component as JednaniList, InitCfg as JednaniListCfg } from './src/jednani/list.js'
import { Component as BodyList, InitCfg as BodyListCfg } from './src/body/list.js'
import SchuzeDetail from './src/schuze/index.js'

export default async function setupJednaniRoutes (path, cfg) {
  const cfgs = {
    [NAMES.jednanilist]: await JednaniListCfg(cfg),
    [NAMES.bodylist]: await BodyListCfg(cfg),
    // [NAMES.bodydetail]: await BodyDetailCfg(cfg),
  }
  return [{ 
    path: `${path}jednani/`, 
    name: NAMES.jednanilist, 
    component: JednaniList, 
    props: route => {
      return { query: route.query, cfg: cfgs[NAMES.jednanilist] }
    }
  }, { 
    path: `${path}body/`, 
    name: NAMES.bodylist, 
    component: BodyList, 
    props: route => {
      return { query: route.query, cfg: cfgs[NAMES.bodylist] }
    }
  }, { 
    path: `${path}schuze/:id`,
    name: NAMES.schuzedetail, 
    component: SchuzeDetail,
    props: route => {
      return { params: route.params, query: route.query, cfg: cfgs[NAMES.bodylist] }
    }
  }
]
}
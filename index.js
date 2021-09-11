import { ROUTE_NAMES as NAMES } from './src/consts.js'
import { Component as JednaniList, InitCfg as JednaniListCfg } from './src/jednani/list.js'
import { Component as BodyList, InitCfg as BodyListCfg } from './src/body/list.js'
// import { Component as BodyDetail, InitCfg as BodyDetailCfg } from './src/body/detail.js'

export function createMenu (user) {
  const children = [
    { label: 'jednání', to: { name: NAMES.jednanilist } },
    { label: 'body', to: { name: NAMES.bodylist } }
  ]
  return { label: 'jednání orgánů', children }
}

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
  }
  // , { 
  //   path: `${path}body/:id`,
  //   name: NAMES.bodydetail, 
  //   component: BodyDetail,
  //   props: route => {
  //     return { params: route.params, cfg: cfgs[NAMES.bodydetail] }
  //   }
  // }
]
}
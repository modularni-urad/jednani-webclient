// import { ROUTE_NAMES } from '../consts.js'
import formconfig from './formconfig.js'

export async function InitCfg (cfg, initConfig) {
  const mycfg = {
    url: `${cfg.url}/jednani`,
    conf: formconfig
  }
  await initConfig(mycfg)
  return mycfg
}
export const Component = {
  props: ['query', 'cfg'],
  template: '<ACListView :query="query" :cfg="cfg" />'
}

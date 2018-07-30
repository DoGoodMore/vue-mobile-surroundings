import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _import = require('./_import_' + process.env.NODE_ENV)

export default new Router({
  routes: [
    {path: '/', redirect: '/404'},
    {path: '/login/:token/:resource', component: _import('views/Login')},
    {path: '/redirect/:groupCode/:gameCode/:token/:resource', component: _import('views/Redirect')},
    {path: '/401', component: _import('views/401')},
    {path: '/404', component: _import('views/404')},
    {
      path: '/game',
      component: _import('views/layout/Layout'),
      children: [
        {
          path: 'ssc',
          name: 'ssc',
          component: _import('views/credit/ssc/ssc'),
          children: [
            { path: 'kj/:groupId/:gameId/:gameCode/:gameName', name: 'ssc-kj', component: _import('views/credit/ssc/components/kj') },
            { path: 'lm/:groupId/:gameId/:gameCode/:gameName', name: 'ssc-lm', component: _import('views/credit/ssc/components/lm') },
            { path: 'dyq/:groupId/:gameId/:gameCode/:gameName', name: 'dyq', component: _import('views/credit/ssc/components/dyq') },
            { path: 'deq/:groupId/:gameId/:gameCode/:gameName', name: 'deq', component: _import('views/credit/ssc/components/deq') }
          ]
        },
        {path: 'klc/:groupId/:gameId/:gameCode/:gameName', name: 'klc', component: _import('views/credit/klc/klc')},
        {path: 'xgc/:groupId/:gameId/:gameCode/:gameName', name: 'xgc', component: _import('views/credit/xgc/xgc')},
        {path: 'ssl/:groupId/:gameId/:gameCode/:gameName', name: 'ssl', component: _import('views/credit/ssl/ssl')},
        {
          path: 'pk10',
          name: 'pk10',
          component: _import('views/credit/pk10/pk10'),
          children: [
            { path: 'kj/:groupId/:gameId/:gameCode/:gameName', name: 'kj', component: _import('views/credit/pk10/components/kj') },
            { path: 'lm/:groupId/:gameId/:gameCode/:gameName', name: 'lm', component: _import('views/credit/pk10/components/lm') },
            { path: 'gyh/:groupId/:gameId/:gameCode/:gameName', name: 'gyh', component: _import('views/credit/pk10/components/gyh') }
          ]
        },
        {path: 'klsf/:groupId/:gameId/:gameCode/:gameName', name: 'klsf', component: _import('views/credit/klsf/klsf')},
        {path: 'kl8/:groupId/:gameId/:gameCode/:gameName', name: 'kl8', component: _import('views/credit/kl8/kl8')},
        {path: 'c11x5/:groupId/:gameId/:gameCode/:gameName', name: 'c11x5', component: _import('views/credit/c11x5/c11x5')},
        {
          path: 'k3',
          name: 'k3',
          component: _import('views/credit/k3/k3'),
          children: [
            { path: 'hzds/:groupId/:gameId/:gameCode/:gameName', name: 'hzds', component: _import('views/credit/k3/components/hzds') },
            { path: 'bz/:groupId/:gameId/:gameCode/:gameName', name: 'bz', component: _import('views/credit/k3/components/bz') },
            { path: 'sz/:groupId/:gameId/:gameCode/:gameName', name: 'sz', component: _import('views/credit/k3/components/sz') }
          ]
        },
        {path: 'betRecord', name: 'betRecord', component: _import('views/credit/other/bet-record/bet-record')},
        {path: 'drawHistory/:gameTypeCode/:gameCode/:gameId', name: 'drawHistory', component: _import('views/credit/other/history/history')},
        {path: 'panInfo/:gameTypeCode/:gameCode/:gameId', name: 'panInfo', component: _import('views/credit/other/pan-info/pan-info')},
        {path: 'instantBetting', name: 'instantBetting', component: _import('views/credit/other/instant-betting/instant-betting')},
        {path: 'instantBetting/detail/:gameId/:gameName', name: 'instantBettingDetail', component: _import('views/credit/other/instant-betting/detail/detail')},
        {path: 'todayTotalWin', name: 'todayTotalWin', component: _import('views/credit/other/today-total-win/today-total-win')},
        {path: 'trendChart/:gameTypeCode/:gameName/:gameId', name: 'trendChart', component: _import('views/credit/other/trend-chart/trend-chart')}
      ]
    }
  ]
})

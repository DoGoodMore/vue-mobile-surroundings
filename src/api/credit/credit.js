import httpRequest from 'common/js/request'

/**
 * 获取彩种的游戏列表
 */
export function getGameList () {
  return httpRequest({
    url: '/task/lotteryGameKgController/getGameList',
    method: 'post',
    timeout: 50000
  })
}

/**
 * 获取玩法列表
 * @param data
 */
export function getLotteryPlays (data) {
  return httpRequest({
    url: '/task/lotteryGameKgController/LotteryGameInitData',
    method: 'post',
    data
  })
}

/**
 * 获取玩法详情
 * @param data
 */
export function getPlayGroups (data) {
  return httpRequest({
    url: '/task/lotteryGameKgController/getMasterList',
    method: 'post',
    data
  })
}

/**
 * 投注
 * @param params
 */
export function bet (params) {
  return httpRequest({
    url: '/task/gameBetManger/betGame',
    method: 'post',
    data: params
  })
}

/**
 * 获取用户下注记录
 * @param data
 */
export function getUserGameBetList (data) {
  return httpRequest({
    url: '/task/lotteryGameKgController/getUserGameBetInfo',
    method: 'post',
    data
  })
}

/**
 * 获取游戏开奖历史记录
 * @param data
 */
export function getLotteryDrawHistory (data) {
  return httpRequest({
    url: '/task/lotteryGameKgController/getChartList',
    method: 'post',
    data
  })
}

/**
 * 盘口信息
 * @param data
 * @returns {*}
 */
export function getPanInfo (data) {
  return httpRequest({
    url: '/admin/gameBetRule/getGameBetRuleByGameId',
    method: 'post',
    data
  })
}

/**
 * 即时注单
 * @param data
 * @returns {*}
 */
export function getCurrentBet () {
  return httpRequest({
    url: '/task/lotteryGameKgController/queryNowBet',
    method: 'post'
  })
}

/**
 * 今日输赢
 * @returns {*}
 */
export function getTodayTotalWin () {
  return httpRequest({
    url: '/task/lotteryGameKgController/getWinOrLoseToday',
    method: 'post'
  })
}

/**
 * 获取彩种开奖信息
 * @param query
 */
export function getLotterysInfo (query) {
  return httpRequest({
    url: '/task/lotteryGameKgController/PcLoadKgGameResult',
    method: 'post',
    data: query
  })
}

/**
 * 获取游戏的开奖结果
 * @param query
 */
export function getLotteryDraw (query) {
  return httpRequest({
    url: '/task/lotteryGameKgController/getLotteryGameResult',
    method: 'post',
    data: query
  })
}

/**
 * 即时注单详情
 * @returns {*}
 */
export function getCurrentBetDetail (data) {
  return httpRequest({
    url: '/task/lotteryGameKgController/queryBetDetail',
    method: 'post',
    data
  })
}

/**
 * 获取用户url信息，根据token获取
 * @returns {*}
 */
export function getUrlByToken (data) {
  return httpRequest({
    url: '/task/lotteryGameKgController/getUrlByToken',
    method: 'post',
    data
  })
}

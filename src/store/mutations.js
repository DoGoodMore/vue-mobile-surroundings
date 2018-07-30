import * as types from './mutation-types'

const mutations = {
  [types.SET_BET_DATA] (state, list) {
    state.betList = list
  },
  [types.SET_BET_DATA_AMOUNT] (state, amount) {
    state.betList.forEach(bet => {
      bet.amount = amount
    })
  },
  [types.SET_BET_DATA_IDS] (state, ids) {
    state.betIdsList = ids
  },
  [types.SET_USER_ACCOUNT] (state, account) {
    state.userAccount = account
  },
  [types.SET_USER_AMOUNT] (state, amount) {
    state.userAmount = amount
  },
  [types.SET_USER_ID] (state, userId) {
    state.userId = userId
  },
  [types.SET_USER_PROXY_ID] (state, userProxyId) {
    state.userProxyId = userProxyId
  },
  [types.SET_USER_MENU_LIST] (state, menus) {
    state.userMenuList = menus
  },
  [types.TOGGLE_USER_MENU_LIST_SHOW] (state, index) {
    state.userMenuList[index].isShow = !state.userMenuList[index].isShow
  },
  [types.CHANGE_GAME_COLLECTION] (state, payload) {
    state.userMenuList[payload.index].children = payload.games
  },
  [types.SET_USER_GAME_LIST_INDEX] (state, index) {
    state.gameListIndex = index
  },
  [types.SET_LOTTERY_ID] (state, id) {
    state.lotteryId = id
  },
  [types.SET_LOTTERY_CODE] (state, code) {
    state.lotteryCode = code
  },
  [types.SET_LOTTERY_NAME] (state, name) {
    state.lotteryName = name
  },
  [types.SET_LOTTERY_RULE] (state, rule) {
    state.lotteryRule = rule
  },
  [types.SET_LOTTERY_GROUP_ID] (state, id) {
    state.lotteryGroupId = id
  },
  [types.SET_LOTTERY_GROUP_CODE] (state, code) {
    state.lotteryGroupCode = code
  },
  [types.SET_HEADER_TITLE] (state, title) {
    state.headerTitle = title
  },
  [types.SET_BETS_DIALOG_VISIBLE] (state, payload) {
    state.betsDialogVisible = payload.visible
  },
  [types.SET_STOP_BET] (state, payload) {
    state.stopBet = payload.stopBet
  },
  [types.SET_TIMER_TIME] (state, payload) {
    state.timerTime = payload.time
  },
  [types.SET_NEXT_ISSUE] (state, payload) {
    state.nextIssue = payload.issue
  },
  [types.SET_PRE_ISSUE] (state, payload) {
    state.preIssue = payload.issue
  },
  [types.SET_STOP_SELL] (state, payload) {
    state.stopSell = payload.stopSell
  },
  [types.UPDATE_LIKE_LIST] (state, payload) {
    state.likeList = payload
  },
  [types.TOGGLE_CHART_CONFIG_VISIBLE] (state, payload) {
    state.chartConfigVisible = payload.visible
  }
}

export default mutations

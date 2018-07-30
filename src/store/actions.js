import * as types from './mutation-types'
import { getUserInfoByToken, getUserBalance, getLikeLotteryGame } from 'api/common'
import { getGameList, bet } from 'api/credit/credit'
import { setMenus, getMenus, removeToken, removeMenus, removeResource } from 'common/js/cache'
import { findIndex } from 'common/js/util'
import { ERR_OK } from 'api/config'

export const selectBet = function ({commit, state}, bet) {
  let betList = state.betList.slice()
  let betIdsList = state.betIdsList.slice()
  let index = findIndex(betList, bet, 'ruleId')
  if (index > -1) {
    betList.splice(index, 1)
    betIdsList.splice(index, 1)
  } else {
    betList.push(bet)
    betIdsList.push(bet.ruleId)
  }
  commit(types.SET_BET_DATA, betList)
  commit(types.SET_BET_DATA_IDS, betIdsList)
  if (!betList.length) {
    commit(types.SET_BETS_DIALOG_VISIBLE, {visible: false})
  }
}

export const changeCollection = function ({commit, state}, {gameTypeCode, gameId, like}) {
  let menuList = state.userMenuList.slice()
  for (let x = 0; x < menuList.length; x++) {
    const group = menuList[x]
    if (group.typeCode === gameTypeCode) {
      const games = JSON.parse(JSON.stringify(group.children))
      for (let y = 0; y < games.length; y++) {
        if (Number(games[y].gameId) === Number(gameId)) {
          games[y].isLike = like
          commit(types.CHANGE_GAME_COLLECTION, {index: x, games})
          break
        }
      }
      break
    }
  }
}

export const setBetsAmount = function ({commit}, amount) {
  commit(types.SET_BET_DATA_AMOUNT, amount)
}

export const cleanBets = function ({commit}) {
  commit(types.SET_BET_DATA, [])
  commit(types.SET_BET_DATA_IDS, [])
}

export const getAccountInfo = function ({commit}, token) {
  return new Promise((resolve, reject) => {
    getUserInfoByToken({token}).then(response => {
      const {currentStatus, currentData} = response
      if (currentStatus === ERR_OK && currentData.hasOwnProperty('userContext')) {
        const {id, parentProxyId, userAccount} = currentData.userContext
        commit(types.SET_USER_ACCOUNT, userAccount)
        commit(types.SET_USER_ID, id)
        commit(types.SET_USER_PROXY_ID, parentProxyId)
        commit(types.SET_USER_MENU_LIST, getMenus())
        resolve(currentData)
      } else {
        reject(new Error('error data'))
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export const betting = function ({commit, state}) {
  return new Promise((resolve, reject) => {
    if (state.stopBet) {
      reject(new Error('已封盘'))
      return
    }
    if (state.stopSell) {
      reject(new Error('已停售'))
      return
    }
    bet({
      betList: state.betList,
      currentNum: state.nextIssue,
      gameId: state.lotteryId,
      proxyId: state.userProxyId,
      userId: state.userId
    }).then(response => {
      const {currentStatus, errorInformation} = response
      if (currentStatus === ERR_OK) {
        commit(types.SET_BET_DATA, [])
        commit(types.SET_BET_DATA_IDS, [])
        commit(types.SET_BETS_DIALOG_VISIBLE, {visible: false})
        resolve()
      } else {
        reject(new Error(errorInformation.errCode))
      }
    }).catch(() => {
      reject(new Error('服务器繁忙'))
    })
  })
}

export const refreshUserBalance = function ({commit, state}) {
  commit(types.SET_USER_AMOUNT, 'loading...')
  return new Promise((resolve, reject) => {
    getUserBalance({proxyGameUserId: state.userId}).then(response => {
      const {currentStatus, currentData} = response
      if (currentStatus === ERR_OK) {
        commit(types.SET_USER_AMOUNT, currentData)
        resolve()
      } else {
        commit(types.SET_USER_AMOUNT, '读取失败')
        reject(new Error('error data'))
      }
    }).catch(error => {
      commit(types.SET_USER_AMOUNT, '读取失败')
      reject(error)
    })
  })
}

export const toggleGroupMenu = function ({commit, state}, group) {
  const userMenuList = state.userMenuList.slice()
  const index = findIndex(userMenuList, group, 'typeId')
  if (index > -1) {
    commit(types.TOGGLE_USER_MENU_LIST_SHOW, index)
  }
}

function parse (data) {
  if (data && data.length) {
    return data.map(item => {
      item.isShow = false
      return item
    })
  }
}

export const getRouter = function ({commit}) {
  return new Promise((resolve, reject) => {
    getGameList().then(response => {
      const {currentStatus, currentData} = response
      if (currentStatus === ERR_OK && currentData.length) {
        const menuList = parse(currentData)
        commit(types.SET_USER_MENU_LIST, menuList)
        setMenus(menuList)
        resolve(menuList)
      } else {
        reject(new Error('error data'))
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export const loginOut = function ({commit}) {
  commit(types.SET_USER_ID, '')
  commit(types.SET_USER_ACCOUNT, '')
  commit(types.SET_USER_PROXY_ID, '')
  commit(types.SET_USER_AMOUNT, '')
  removeToken()
  removeMenus()
  removeResource()
}

export const fetchLikeList = function ({commit}) {
  getLikeLotteryGame().then(response => {
    if (response.currentStatus === ERR_OK) {
      commit(types.UPDATE_LIKE_LIST, response.currentData)
    }
  }).catch(() => {})
}

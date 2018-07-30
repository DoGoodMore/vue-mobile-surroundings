export function getViewportSize () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}

export function findIndex (list, info, attribute) {
  return list.findIndex(item => {
    return item[attribute] === info[attribute]
  })
}

export function isJson (obj) {
  return typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length
}

/**
 * 判断是否为数字
 * @param val
 * @returns {boolean}
 */
export function isNumber (val) {
  return /^[0-9]+[1-9]*]*$/.test(val)
}

/**
 * 判断是否为数组
 * @param o
 * @returns {boolean}
 */
export function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

export function go (url, $router) {
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
  if (useRouter) {
    if (typeof url === 'object' && url.replace === true) {
      $router.replace(url)
    } else {
      url === 'BACK' ? $router.go(-1) : $router.push(url)
    }
  } else {
    window.location.href = url
  }
}

/**
 * 根据下期开奖期数推算出上期开奖期数
 * @param nextIssue 下期开奖期数
 * @param period 当前彩种每天开多少期
 * @param lotteryType 当前彩种类型
 * @returns {string}
 */
export function getPerIssue (nextIssue, period, lotteryType) {
  let perIssue = ''
  let issue = nextIssue.substr(nextIssue.length - period.length, nextIssue.length)
  if ((Number(issue) - 1) === 0) {
    if (lotteryType === 1) { // 为yyyyMMdd xxx 3位数
      perIssue = period.length > 2 ? `${getLastDayYYYYMMDDStr(nextIssue)}${period}` : `${getLastDayYYYYMMDDStr(nextIssue)}0${period}`
    } else if (lotteryType === 3) { // yyMMdd xxx 3位数
      perIssue = period.length > 2 ? `${getLastDayYYMMDDStr(nextIssue)}${period}` : `${getLastDayYYMMDDStr(nextIssue)}0${period}`
    } else if (lotteryType === 6) {
      perIssue = period.length > 3 ? `${getLastDayYYYYMMDDStr(nextIssue)}${period}` : `${getLastDayYYYYMMDDStr(nextIssue)}0${period}`
    } else if (lotteryType === 7) {
      perIssue = period.length > 1 ? `${getLastDayYYYYMMDDStr(nextIssue)}${period}` : `${getLastDayYYYYMMDDStr(nextIssue)}0${period}`
    } else {
      perIssue = `${(Number(nextIssue) - 1)}`
    }
  } else {
    perIssue = `${(Number(nextIssue) - 1)}`
  }
  let flag = false
  if (nextIssue.split('')[0] === 0) {
    flag = true
  }
  if (flag) {
    perIssue = `0${perIssue}`
  }
  return perIssue
}

function getLastDayYYMMDDStr (nextGameResultNum) {
  const perIssueDate = `${nextGameResultNum.substr(0, 4)}/${nextGameResultNum.substr(4, 2)}/${nextGameResultNum.substr(6, 2)}`
  const lastDateTime = new Date(perIssueDate).getTime() - 24 * 60 * 60 * 1000
  return getFormateDate(lastDateTime, 'yyMMdd')
}

function getLastDayYYYYMMDDStr (nextGameResultNum) {
  const perIssueDate = `${nextGameResultNum.substr(0, 4)}/${nextGameResultNum.substr(4, 2)}/${nextGameResultNum.substr(6, 2)}`
  const lastDateTime = new Date(perIssueDate).getTime() - 24 * 60 * 60 * 1000
  return getFormateDate(lastDateTime, 'yyyyMMdd')
}

/**
 * 日期格式化
 * @param dateTime 格式
 * @param fmt 被格式化的时间(没有就取当前系统时间)
 * @returns {string}
 */
export function getFormateDate (dateTime, fmt) {
  if (dateTime) {
    return `${new Date(dateTime).Format(fmt)}`
  }
  return `${new Date().Format(fmt)}`
}

export function parseDrawResult (code, result) {
  const temp = []
  let sum = 0
  result.forEach((ball, index) => {
    sum += Number(ball)
    if (code === 'xgc' && result.length === (index + 1)) {
      temp.push({show: true, value: '+', code: 'plus'})
    }
    temp.push({show: code !== 'pk10', value: ball, code: ball})
  })
  if (code === 'klc') {
    temp.push({show: true, value: '=', code: 'equal'})
    temp.push({show: true, value: sum, code: sum})
  }
  return temp
}

/**
 * 获取页面元素绝对定位坐标
 * @param target //目标元素
 * @returns {object}
 *
 */
export function offset (target) {
  let top = 0
  let left = 0

  while (target.offsetParent) {
    top += target.offsetTop
    left += target.offsetLeft
    target = target.offsetParent
  }

  return {
    top: top,
    left: left
  }
}

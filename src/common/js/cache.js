const TOKEN_KEY = '__whh_token__'
const MENU_KEY = '__whh_menus__'
const RESOURCE_KEY = '__whh_resource__'

export function getToken () {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken (token) {
  return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken () {
  return localStorage.removeItem(TOKEN_KEY)
}
export function setMenus (data) {
  return localStorage.setItem(MENU_KEY, JSON.stringify(data))
}

export function getMenus () {
  return JSON.parse(localStorage.getItem(MENU_KEY))
}

export function removeMenus () {
  return localStorage.removeItem(MENU_KEY)
}

export function getResource () {
  return localStorage.getItem(RESOURCE_KEY)
}

export function setResource (url) {
  return localStorage.setItem(RESOURCE_KEY, url)
}

export function removeResource () {
  return localStorage.removeItem(RESOURCE_KEY)
}

export function changeCacheLike (gameTypeCode, gameId, like) {
  const menus = getMenus()
  for (let x = 0; x < menus.length; x++) {
    const group = menus[x]
    if (group.typeCode === gameTypeCode) {
      for (let y = 0; y < group.children.length; y++) {
        const game = group.children[y]
        if (game.gameId === gameId) {
          game.isLike = like
          break
        }
      }
      break
    }
  }
  setMenus(menus)
}

export function assembleParam (url, param) {
  return JSON.stringify({
    uri: url,
    token: getToken(),
    paramData: param
  })
}

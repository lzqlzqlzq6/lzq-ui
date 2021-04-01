import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getCookie() {
  return Cookies.get(TokenKey)
}

export function setCookie(token) {
  return Cookies.set(TokenKey, token ,{ expires: 30})
}

export function removeCookie() {
  return Cookies.remove(TokenKey)
}
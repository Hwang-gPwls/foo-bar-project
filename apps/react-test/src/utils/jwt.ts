import jwt_decode from 'jwt-decode'

interface IJwt {
  email: string
  iat: number
  exp: number
}

const checkIsExpiration = async () => {
  const token = localStorage.getItem('token')
  const decoded: IJwt = jwt_decode(token)

  const now = Math.floor(new Date().getTime() / 1000)

  if (decoded.exp < now) {
    localStorage.removeItem('token')

    return true
  } else {
    return false
  }
}

const returnEmail = async () => {
  const token = localStorage.getItem('token')
  const decoded: IJwt = jwt_decode(token)

  return decoded.email
}

const getLocalStorageItem = () => {
  return new Promise((resolve, reject) => {
    resolve(localStorage.getItem('token'))
  })
}

const clearLocalStorageItem = () => {
  return new Promise((resolve, reject) => {
    resolve(localStorage.clear())
  })
}

export default {
  checkIsExpiration,
  returnEmail,
  getLocalStorageItem,
  clearLocalStorageItem,
}

import jwtDecode from 'jwt-decode'

interface IJwt {
  email: string
  exp: number
  iat: number
}

const checkIsExpiration = async () => {
  const token = localStorage.getItem('token')
  const decoded: IJwt = jwtDecode(token)

  const numDivide = 1000
  // eslint-disable-next-line unicorn/prefer-date-now
  const now = Math.floor(new Date().getTime() / numDivide)

  if (decoded.exp < now) {
    localStorage.removeItem('token')

    return true
  }

  return false
}

const returnEmail = async () => {
  const token = localStorage.getItem('token')
  const decoded: IJwt = jwtDecode(token)

  return decoded.email
}

const getLocalStorageItem = () => {
  return new Promise((resolve) => {
    resolve(localStorage.getItem('token'))
  })
}

const clearLocalStorageItem = () => {
  return new Promise((resolve) => {
    resolve(localStorage.clear())
  })
}

export default {
  checkIsExpiration,
  clearLocalStorageItem,
  getLocalStorageItem,
  returnEmail,
}

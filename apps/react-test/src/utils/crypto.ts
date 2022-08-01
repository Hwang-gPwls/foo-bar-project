import sha256 from 'crypto-js/sha256'

const cryptoPassword = async (password: string) => {
  return sha256(password).toString()
}

export default {cryptoPassword}

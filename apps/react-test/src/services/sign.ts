import {restAuthSignIn, restAuthSignUp, restAuthUpdatePassword} from 'api/sign'

export const getSignInStatus = async (
  email: string,
  cryptoPassword: string,
) => {
  await restAuthSignIn(email, cryptoPassword).catch((error_) => {
    throw error_
  })
}

export const getSignUpStatus = async (
  email: string,
  cryptoPassword: string,
) => {
  await restAuthSignUp(email, cryptoPassword).catch((error_) => {
    throw error_
  })
}

export const getUpdatePasswordStatus = async (
  cryptoNewPassword: string,
  cryptoPassword: string,
) => {
  await restAuthUpdatePassword(cryptoPassword, cryptoNewPassword).catch(
    (error_) => {
      throw error_
    },
  )
}

export default {
  getSignInStatus,
  getSignUpStatus,
  getUpdatePasswordStatus,
}

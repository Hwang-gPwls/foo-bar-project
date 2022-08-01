import axios from 'axios'
import {API_ENDPOINT} from 'config/config'
import jwt from 'utils/jwt'
import {ToastMessage} from 'components/ToastMessage'

export const restAuthSignUp = async (email: string, password: string) => {
  await axios
    .post(`${API_ENDPOINT}/auth/sign-up`, {
      email,
      password,
    })
    .then(async ({data}) => {
      console.log(`request successfully ${JSON.stringify(data)}`)
      localStorage.setItem('token', data.token)
    })
}

export const restAuthSignIn = async (email: string, password: string) => {
  await axios
    .post(`${API_ENDPOINT}/auth/sign-in`, {
      email,
      password,
    })
    .then(async ({data}) => {
      console.log(`request successfully ${JSON.stringify(data)}`)
      localStorage.setItem('token', data.token)
    })
}

export const restAuthUpdatePassword = async (
  password: string,
  newPassword: string,
) => {
  const token = await jwt.getLocalStorageItem()

  await axios
    .patch(
      `${API_ENDPOINT}/auth/update-password`,
      {
        password,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(async ({data}) => {
      console.log(`request successfully ${JSON.stringify(data)}`)
    })
}

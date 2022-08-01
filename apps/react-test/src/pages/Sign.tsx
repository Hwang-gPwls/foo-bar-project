import {useEffect, useState} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useLocation, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {restAuthSignIn, restAuthSignUp, restAuthUpdatePassword} from 'api/sign'
import {Inputs, RestSignUpReq} from 'pages/types'
import {CONSTANTS} from 'public/constants'
import INPUTS from 'public/data'
import crypto from 'utils/crypto'
import jwt from 'utils/jwt'

import {InputText} from 'components/InputText'
import {Button} from 'components/Button'
import {Loading} from 'components/Loading'

const openToast = (message: string) => {
  toast.error(message, {
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: false,
    position: toast.POSITION.TOP_CENTER,
    theme: 'dark',
  })
}

export const SignPage: FPC = () => {
  const locationHook = useLocation()
  const methods = useForm()

  const [loading, setLoading] = useState(false)
  const [pathName, setPathName] = useState<string>('')
  const [inputDatas, setInputDatas] = useState<Inputs[]>([])

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<RestSignUpReq> = async (data) => {
    console.log(data)
    const cryptoPassword = await crypto.cryptoPassword(data.password)
    const cryptoNewPassword = await crypto.cryptoPassword(data.newPassword)
    let errorMessage = ''

    setLoading(true)

    switch (pathName) {
      case CONSTANTS.PATH_SIGN_UP:
        await restAuthSignUp(data.email, cryptoPassword).catch((error_) => {
          if (error_.message.endsWith('409')) {
            errorMessage = error_.message
            openToast('잘못된 비밀번호 입니다.')
          }
        })
        break
      case CONSTANTS.PATH_SIGN_IN:
        await restAuthSignIn(data.email, cryptoPassword).catch((error_) => {
          if (error_.message.endsWith('401')) {
            errorMessage = error_.message
            openToast('잘못된 비밀번호 입니다.')
          }
        })
        break
      case CONSTANTS.PATH_PASSWORD:
        await restAuthUpdatePassword(cryptoPassword, cryptoNewPassword).catch(
          (error_) => {
            if (error_.message.endsWith('401')) {
              errorMessage = error_.message
              openToast('잘못된 비밀번호 입니다.')
            }
          },
        )
        await jwt.clearLocalStorageItem()
        break
    }

    setLoading(false)

    if (errorMessage === '') {
      navigate('/')
    }
  }

  useEffect(() => {
    const splitUrl = locationHook?.pathname?.split('/') ?? null
    const location = splitUrl?.length > 1 ? splitUrl[splitUrl.length - 1] : null
    setPathName(location)

    if (inputDatas.length === 0) {
      switch (pathName) {
        case CONSTANTS.PATH_SIGN_UP:
          setInputDatas(INPUTS.inputSignUp)
          break
        case CONSTANTS.PATH_SIGN_IN:
          setInputDatas(INPUTS.inputSignIn)
          break
        case CONSTANTS.PATH_PASSWORD:
          setInputDatas(INPUTS.inputPassword)
          break
      }
    }
  }, [pathName])

  return (
    <FormProvider {...methods}>
      {loading ? <Loading /> : null}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container>
          {inputDatas &&
            inputDatas.map((data) => (
              <InputText
                key={`${pathName}_${data.id}`}
                id={data.id}
                description={data.description}
                placeholder={data.placeholder}
              />
            ))}
          <Button
            id={'sign'}
            title={
              pathName === CONSTANTS.PATH_SIGN_UP
                ? 'SIGN UP'
                : pathName === CONSTANTS.PATH_SIGN_IN
                ? 'SIGN IN'
                : 'UPDATE PASSWORD'
            }
            type="submit"
            // isDisabled={errors.hasOwnProperty('error') ? true : false}
            isDisabled={false}
          />
        </Container>
      </form>
      <ToastContainer limit={3} />
    </FormProvider>
  )
}

const Container = styled.div`
  height: 5rem;
  margin: 2rem 5rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`

export default SignPage

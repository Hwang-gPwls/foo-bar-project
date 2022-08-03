/* eslint-disable max-lines-per-function */
import {useEffect, useState} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useLocation, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {Inputs, RestSignUpReq} from 'pages/types'
import {CONSTANTS} from 'public/constants'
import crypto from 'utils/crypto'
import jwt from 'utils/jwt'
import service from 'services/sign'
import Datas from 'public/data'

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

const callAPI = async (data, pathName) => {
  try {
    const message = '입력한 패스워드가 일치하지 않습니다.'

    const cryptoPassword = await crypto.cryptoPassword(data.password)
    const cryptoPasswordConfirm = await crypto.cryptoPassword(
      data.passwordConfirm,
    )
    let cryptoNewPassword = ''

    switch (pathName) {
      case CONSTANTS.PATH_SIGN_IN:
        await service.getSignInStatus(data.email, cryptoPassword)
        break
      case CONSTANTS.PATH_SIGN_UP:
        if (cryptoPassword !== cryptoPasswordConfirm) {
          alert(message)
          return true
        }
        await service.getSignUpStatus(data.email, cryptoPassword)
        break
      case CONSTANTS.PATH_PASSWORD:
        cryptoNewPassword = await crypto.cryptoPassword(data.newPassword)

        if (cryptoNewPassword !== cryptoPasswordConfirm) {
          alert(message)
          return true
        }

        await service.getUpdatePasswordStatus(cryptoNewPassword, cryptoPassword)
        await jwt.clearLocalStorageItem()
        break
    }
  } catch (error) {
    const errorVal = Datas.errorMessages.find(
      (errors) =>
        errors.path === pathName && error.message.endsWith(errors.code),
    )

    openToast(errorVal.message)

    return error
  }
}

export const SignPage: FPC = () => {
  const locationHook = useLocation()
  const navigate = useNavigate()
  const methods = useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [pathName, setPathName] = useState<string>('')
  const [inputDatas, setInputDatas] = useState<Inputs[]>([])
  const [hasErrors, setHasErrors] = useState<object[]>([])

  const getValidationErrors = (error: any) => {
    const key = error.id
    let copyHasErrors: object[] = [...hasErrors]

    const checkErrors = (element) => {
      if (element.id === key) {
        return true
      }
    }

    if (copyHasErrors.some(checkErrors)) {
      const elementIndex = copyHasErrors.findIndex((obj) => obj['id'] == key)
      copyHasErrors[elementIndex]['hasError'] = error.hasError
    } else {
      copyHasErrors.push(error)
    }

    setHasErrors(copyHasErrors)
  }

  useEffect(() => {
    const cntError = hasErrors.filter(
      (error) => error['hasError'] === true,
    ).length

    if (
      hasErrors.length > 0 &&
      hasErrors.length === inputDatas.length &&
      cntError === 0
    ) {
      setIsSubmit(true)
    } else {
      setIsSubmit(false)
    }
  }, [hasErrors])

  useEffect(() => {
    const splitUrl = locationHook?.pathname?.split('/') ?? null
    const location = splitUrl?.length > 1 ? splitUrl[splitUrl.length - 1] : null
    setPathName(location)

    const promise = async () => {
      await jwt.getLocalStorageItem()
      jwt.getLocalStorageItem().then((appData) => {
        if (!appData && pathName === 'password') {
          navigate('/error')
        }
      })

      if (inputDatas.length === 0) {
        switch (pathName) {
          case CONSTANTS.PATH_SIGN_UP:
            setInputDatas(Datas.inputSignUp)
            break
          case CONSTANTS.PATH_SIGN_IN:
            setInputDatas(Datas.inputSignIn)
            break
          case CONSTANTS.PATH_PASSWORD:
            setInputDatas(Datas.inputPassword)
            break
        }
      }
    }

    promise().catch(console.error)
  }, [pathName])

  const onSubmit: SubmitHandler<RestSignUpReq> = async (data) => {
    setIsLoading(true)

    const error = await callAPI(data, pathName)

    if (!error) {
      navigate('/')
    }

    setIsLoading(false)
  }

  return (
    <FormProvider {...methods}>
      {isLoading ? <Loading /> : null}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container>
          {inputDatas &&
            inputDatas.map((data) => (
              <InputText
                key={`${pathName}_${data.id}`}
                id={data.id}
                description={data.description}
                placeholder={data.placeholder}
                pathName={pathName}
                name={data.name}
                getErrorValues={getValidationErrors}
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
            isDisabled={isSubmit !== true}
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

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

const ReplaceArrayItem = (oldArray: object[], key: string, error: object) => {
  for (const element of oldArray) {
    if (Object.keys(element)[0] === key) {
      element[key] = error[key]
    }
  }

  return oldArray
}

const getPromiseData = () => {
  const promise = jwt.getLocalStorageItem()
  promise.then((appData) => {
    return appData
  })
}

const redirect = async (pathName) => {
  const token: any = await getPromiseData()
  const navigate = useNavigate()

  if (!token && pathName === 'password') {
    navigate('/error')
  }
}

const callAPI = async (data, pathName) => {
  try {
    const cryptoPassword = await crypto.cryptoPassword(data.password)
    let cryptoNewPassword = ''

    switch (pathName) {
      case CONSTANTS.PATH_SIGN_IN:
        await service.getSignInStatus(data.email, cryptoPassword)
        break
      case CONSTANTS.PATH_SIGN_UP:
        await service.getSignUpStatus(data.email, cryptoPassword)
        break
      case CONSTANTS.PATH_PASSWORD:
        cryptoNewPassword = await crypto.cryptoPassword(data.newPassword)

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
    // eslint-disable-next-line prefer-destructuring
    const key = Object.keys(error)[0]
    let copyHasErrors: object[] = [...hasErrors]

    // eslint-disable-next-line no-prototype-builtins
    if (copyHasErrors.some((data) => data.hasOwnProperty(key))) {
      copyHasErrors = ReplaceArrayItem(copyHasErrors, key, error)
    } else {
      copyHasErrors.push(error)
    }

    setHasErrors(copyHasErrors)
  }

  useEffect(() => {
    const cntError = hasErrors.filter(
      (error) => Object.values(error)[0] === true,
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
                getHasErrors={getValidationErrors}
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

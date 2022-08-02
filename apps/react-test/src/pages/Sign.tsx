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

export const SignPage: FPC = () => {
  const locationHook = useLocation()
  const methods = useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [pathName, setPathName] = useState<string>('')
  const [inputDatas, setInputDatas] = useState<Inputs[]>([])
  const [hasErrors, setHasErrors] = useState<object[]>([])

  const navigate = useNavigate()

  const getValidationErrors = (error: any) => {
    let copyHasErrors: object[] = [...hasErrors]
    const key = Object.keys(error)[0]
    if (
      copyHasErrors.length !== 0 &&
      copyHasErrors.filter((data) => data.hasOwnProperty(key)).length !== 0
    ) {
      copyHasErrors.map((data) => {
        if (Object.keys(data)[0] === key) {
          data[key] = error[key]
        }
      })
    } else {
      copyHasErrors.push(error)
    }

    setHasErrors(copyHasErrors)
  }

  useEffect(() => {
    if (hasErrors.length !== 0 && hasErrors.length === inputDatas.length) {
      if (
        hasErrors.filter((error) => Object.values(error)[0] === true).length ===
        0
      ) {
        setIsSubmit(true)
      } else {
        setIsSubmit(false)
      }
    }
  }, [hasErrors])

  const onSubmit: SubmitHandler<RestSignUpReq> = async (data) => {
    const cryptoPassword = await crypto.cryptoPassword(data.password)
    const cryptoNewPassword = await crypto.cryptoPassword(data.newPassword)
    let errorVal = null

    setIsLoading(true)

    try {
      switch (pathName) {
        case CONSTANTS.PATH_SIGN_IN:
          await service.getSignInStatus(data.email, cryptoPassword)
          break
        case CONSTANTS.PATH_SIGN_UP:
          await service.getSignUpStatus(data.email, cryptoPassword)
          break
        case CONSTANTS.PATH_PASSWORD:
          await service.getUpdatePasswordStatus(
            cryptoPassword,
            cryptoNewPassword,
          )
          await jwt.clearLocalStorageItem()
          break
      }

      navigate('/')
    } catch (error) {
      errorVal = Datas.errorMessages.filter(
        (errors) =>
          errors.path === pathName && error.message.endsWith(errors.code),
      )

      openToast(errorVal[0].message)
    }

    setIsLoading(false)
  }

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
            isDisabled={isSubmit === true ? false : true}
            //isDisabled={true}
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

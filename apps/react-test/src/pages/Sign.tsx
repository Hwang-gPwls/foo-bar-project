import {useState, useEffect} from 'react'
import {useForm, SubmitHandler, FormProvider} from 'react-hook-form'
import {useLocation, useNavigate} from 'react-router-dom'
import styled from 'styled-components'

import {restAuthSignIn, restAuthSignUp, restAuthUpdatePassword} from 'api/sign'
import INPUTS from 'public/data'
import crypto from 'utils/crypto'
import jwt from 'utils/jwt'
import {CONSTANTS} from 'public/constants'
import {Inputs, RestSignUpReq} from 'pages/types'

import InputText from 'components/InputText'
import {Button} from 'components/Button'
import {ToastMessage} from 'components/ToastMessage'

export const SignPage: FPC = () => {
  const {pathname} = useLocation()
  const [curPath, setCurPath] = useState<string>()
  const [btnTitle, setBtnTitle] = useState<string>()
  const [inputDatas, setInputDatas] = useState<Inputs[]>([])
  const [error, setError] = useState<string>('')

  const navigate = useNavigate()

  const methods = useForm()

  const onSubmit: SubmitHandler<RestSignUpReq> = async (data) => {
    console.log(data)
    const cryptoPassword = await crypto.cryptoPassword(data.password)

    if (pathname.endsWith(CONSTANTS.PATH_SIGN_UP)) {
      await restAuthSignUp(data.email, cryptoPassword).catch((err) => {
        setError('tmp')
      })
    } else if (pathname.endsWith(CONSTANTS.PATH_SIGN_IN)) {
      await restAuthSignIn(data.email, cryptoPassword).catch((err) => {
        setError('tmp')
      })
    } else if (pathname.endsWith(CONSTANTS.PATH_PASSWORD)) {
      const cryptoNewPassword = await crypto.cryptoPassword(data.newPassword)

      await restAuthUpdatePassword(cryptoPassword, cryptoNewPassword).catch(
        (err) => {
          return <ToastMessage status="401" page="signUp" />
        },
      )
      await jwt.clearLocalStorageItem()
    }
    // navigate('/')
  }

  useEffect(() => {
    if (inputDatas.length === 0) {
      if (pathname.endsWith(CONSTANTS.PATH_SIGN_UP)) {
        setCurPath(CONSTANTS.PATH_SIGN_UP)
        setInputDatas(INPUTS.inputSignUp)
        setBtnTitle('SIGN UP')
      } else if (pathname.endsWith(CONSTANTS.PATH_SIGN_IN)) {
        setCurPath(CONSTANTS.PATH_SIGN_IN)
        setInputDatas(INPUTS.inputSignIn)
        setBtnTitle('SIGN IN')
      } else if (pathname.endsWith(CONSTANTS.PATH_PASSWORD)) {
        setCurPath(CONSTANTS.PATH_PASSWORD)
        setInputDatas(INPUTS.inputPassword)
        setBtnTitle('UPDATE PASSWORD')
      }
    }
    setError('')
  }, [error, setError])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container>
          {inputDatas &&
            inputDatas.map((data) => (
              <InputText
                key={`${curPath}_${data.id}`}
                id={data.id}
                description={data.description}
                placeholder={data.placeholder}
              />
            ))}
          <Button
            id={'sign'}
            title={btnTitle}
            type="submit"
            // isDisabled={errors.hasOwnProperty('error') ? true : false}
            isDisabled={false}
          />
        </Container>
      </form>
      {error !== '' && <ToastMessage status="401" page="signUp" />}
      {/* <ToastMessage status="401" page="signUp" /> */}
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

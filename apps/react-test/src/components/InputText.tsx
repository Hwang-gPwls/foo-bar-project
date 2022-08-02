import {useEffect, useState} from 'react'
import styled from 'styled-components'
import validation from 'utils/sign-validation'
import {useFormContext} from 'react-hook-form'
import {Inputs} from 'pages/types'
import {CONSTANTS} from 'public/constants'

// eslint-disable-next-line solid/no-destructure
export const InputText: FC<Inputs> = ({
  id,
  description,
  placeholder,
  pathName,
  name,
  getHasErrors,
}: Inputs) => {
  const {register} = useFormContext()
  const [values, setValues] = useState<object>({})
  const [errors, setErrors] = useState<object>({})
  const [isChanged, setIsChanged] = useState<Object>({
    email: false,
    password: false,
    passwordConfirm: false,
    newPassword: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setValues({...values, [name]: value})

    setIsChanged({...isChanged, [name]: true})
  }

  useEffect(() => {
    switch (pathName) {
      case CONSTANTS.PATH_SIGN_IN:
        setErrors(validation.signInValidation(values))
        break
      case CONSTANTS.PATH_SIGN_UP:
        setErrors(validation.signOnValidation(values))
        break
      case CONSTANTS.PATH_PASSWORD:
        setErrors(validation.updatePasswordValidation(values))
        break
    }
  }, [values])

  useEffect(() => {
    if (isChanged[id] === true && !errors[id]) {
      getHasErrors({[id]: false})
    } else {
      getHasErrors({[id]: true})
    }
  }, [errors])

  return (
    <Container>
      <input
        type={id.toUpperCase().includes('PASSWORD') ? 'password' : 'text'}
        className="input"
        placeholder={placeholder}
        {...register(id)}
        onChange={handleChange}
      />
      <div className="text">
        {isChanged[id] === false
          ? null
          : !errors[id]
          ? `올바른 ${name}입니다.`
          : errors[id]}
      </div>
      {isChanged[id] === false ? (
        <div className="text">{description}</div>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin: 1rem auto;

  .input {
    width: 100%;
    padding: 1rem;
    margin-bottom: 0.7rem;
    background-color: ${({theme}) => theme.color.darkgray};
    border-radius: var(--rounded-btn, 0.5rem);
    outline: 1px solid ${({theme}) => theme.color.gray};
    outline-offset: 2px;
  }

  .text {
    margin-left: 0.7rem;
    font-size: 1.1vw;
  }
`

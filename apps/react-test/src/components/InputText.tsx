import {useEffect, useState} from 'react'
import styled from 'styled-components'
import validation from 'utils/sign-validation'
import {useFormContext} from 'react-hook-form'
import {Inputs} from 'pages/types'

// eslint-disable-next-line solid/no-destructure
export const InputText: FC<Inputs> = ({
  id,
  description,
  placeholder,
}: Inputs) => {
  const {register} = useFormContext()
  const [values, setValues] = useState<object>({})
  const [error, setError] = useState<object>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target)
    const {name, value} = event.target
    setValues({...values, [name]: value})

    const SignValidationProps = {
      email: '',
      password: '',
    }

    setError(validation.signValidation(SignValidationProps))
    debugger
  }

  return (
    <Container>
      <input
        type={id.toUpperCase().includes('PASSWORD') ? 'password' : 'text'}
        className="input"
        placeholder={placeholder}
        {...register(id)}
        onChange={handleChange}
      />
      <span className="text">{error[id]}</span>
      <span className="text">{description}</span>
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

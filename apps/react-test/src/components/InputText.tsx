import styled from 'styled-components'
import {useFormContext} from 'react-hook-form'
import {Inputs} from 'pages/types'

export const InputText: FC<Inputs> = ({
  id,
  description,
  placeholder,
}: Inputs) => {
  const {register} = useFormContext()

  return (
    <Container>
      <input
        type={id.toUpperCase().includes('PASSWORD') ? 'password' : 'text'}
        className="input"
        placeholder={placeholder}
        {...register(id, {
          required: true,
        })}
      />

      <span className="description">{description}</span>
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

  .description {
    font-size: 1.1vw;
  }
`

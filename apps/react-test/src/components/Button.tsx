import styled from 'styled-components'

interface ButtonProps {
  id: string
  type: 'button' | 'submit' | 'reset'
  title: string
  isDisabled: boolean
  onClick?: (e: any) => void
}

export const Button: FC<ButtonProps> = ({
  id,
  type = 'submit',
  title,
  isDisabled = true,
  onClick,
}: ButtonProps) => {
  return (
    <Container>
      <button
        id={id}
        type={type}
        className="btn"
        disabled={isDisabled}
        onClick={onClick}
      >
        {title}
      </button>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  .btn {
    width: 100%;
  }
`

import {Button} from 'components/Button'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

export const Error: FC = () => {
  const navigate = useNavigate()
  const returnHome = () => {
    navigate('/')
  }

  return (
    <Container>
      <div className="text">접근 할 수 없는 페이지 입니다.</div>
      <Button
        id={'error'}
        title={'GO HOME'}
        type="button"
        isDisabled={false}
        onClick={returnHome}
      />
    </Container>
  )
}

const Container = styled.div`
  height: 5rem;
  margin: 2rem 5rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`

export default Error

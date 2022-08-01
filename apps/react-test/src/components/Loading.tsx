import styled, {keyframes} from 'styled-components'

export const Loading: FC = () => {
  return (
    <Container>
      <Spinner>
        <circle cx="50%" cy="50%" r="25" />
      </Spinner>
    </Container>
  )
}

const LoadingSpin = keyframes`
100% {
    transform: rotate(360deg);
}
`
const LoadingCircle = keyframes`
0% {
    stroke-dashoffset: 157;
}

75% {
    stroke-dashoffset: -147;
}

100% {
    stroke-dashoffset: -157;
}
`

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
`

const Spinner = styled.svg`
  width: 54px;
  height: 54px;
  animation: ${LoadingCircle} 3s infinite;

  circle {
    stroke: #000000;
    stroke-width: 4;
    stroke-dasharray: 157;
    stroke-dashoffset: 0;
    fill: transparent;
    animation: ${LoadingSpin} 1s infinite;
  }
`

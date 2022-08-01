import {Outlet} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {theme} from 'styles/theme'
import Logo from 'assets/images/logo.png'

export const MainLayout: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <img src={Logo} />
      </Header>
      <Outlet />
    </ThemeProvider>
  )
}

const Header = styled.div`
  text-align: center;
  height: 100%;

  img {
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }
`

export default MainLayout

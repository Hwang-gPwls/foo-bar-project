import {FC, useEffect, useState} from 'react'
import styled from 'styled-components'
import {Button} from 'components/Button'
import {NavLink} from 'react-router-dom'
import BUTTONS from 'public/data'
import {Buttons} from 'pages/types'

export const MainPage: FC = () => {
  const [btnDatas, setBtnDatas] = useState<Buttons[]>([])

  const onClick = (element) => {
    if (element.target.id === 'signOut') {
      localStorage.clear()
      window.location.reload()
    }
  }

  useEffect(() => {
    if (btnDatas.length === 0) {
      const token = localStorage.getItem('token')
      // const email = jwt.returnEmail()

      if (token) {
        setBtnDatas(BUTTONS.buttonLogIn)
      } else {
        setBtnDatas(BUTTONS.buttonLogOut)
      }
    }
  }, [])

  return (
    <Container>
      {btnDatas &&
        btnDatas.map((data, idx) => (
          <NavLink to={data.path} key={idx.toString()}>
            <Button
              id={data.id}
              title={data.title}
              type="button"
              isDisabled={false}
              onClick={onClick}
            />
          </NavLink>
        ))}
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

export default MainPage

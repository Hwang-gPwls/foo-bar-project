import {Suspense} from 'react'
import {BrowserRouter as Router, useRoutes} from 'react-router-dom'
import {routes} from 'src/routes'

const Routes = () => {
  return useRoutes(routes)
}

export const Root: FC = () => {
  return (
    <>
      <Router>
        <Suspense>
          <Routes />
        </Suspense>
      </Router>
    </>
  )
}

export default Root

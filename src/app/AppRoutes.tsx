import { type FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAppSelector } from './hooks'

import { selectIsAuth } from 'features/Auth/selectors'
import Chats from 'pages/Chat/Chat'
import Login from 'pages/Login/Login'
import { PathRoute } from 'shared/const'

export const AppRoutes: FC = () => {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <Routes>
      <Route
        path='/'
        element={
          isAuth ? (
            <Navigate to={PathRoute.chats} />
          ) : (
            <Navigate to={PathRoute.login} />
          )
        }
      />
      <Route
        path={PathRoute.login}
        element={isAuth ? <Navigate to={PathRoute.chats} /> : <Login />}
      />
      <Route
        path={PathRoute.chats}
        element={isAuth ? <Chats /> : <Navigate to={PathRoute.login} />}
      />
    </Routes>
  )
}

export default AppRoutes

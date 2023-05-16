import { type FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import Chats from '../pages/Chat/Chat'

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Chats />} />
    </Routes>
  )
}

export default AppRoutes

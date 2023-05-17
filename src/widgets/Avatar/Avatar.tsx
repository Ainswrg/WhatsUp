import AccountCircle from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import { type FC } from 'react'

export const AvatarBase: FC = (props) => {
  return (
    <Avatar>
      <AccountCircle />
    </Avatar>
  )
}

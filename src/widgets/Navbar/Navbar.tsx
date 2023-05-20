import Logout from '@mui/icons-material/Logout'
import { AppBar, Grid, Toolbar, IconButton, Typography } from '@mui/material'

import React, { type FC } from 'react'

import { useAppDispatch, useAppSelector } from 'app/hooks'

import { selectChatId } from 'features/AddContact/selectors'
import { logout } from 'features/Auth/slice'
import { AvatarBase } from 'widgets/Avatar/Avatar'

export const Navbar: FC = () => {
  const dispatch = useAppDispatch()
  const chatId = useAppSelector(selectChatId)

  const onSubmit = () => {
    dispatch(logout())
  }

  return (
    <AppBar position='static' sx={{ background: '#202C33' }}>
      <Toolbar disableGutters>
        <Grid container justifyContent={'space-between'}>
          <Grid
            item
            xs={5}
            sx={{ borderRight: '1px solid #404040', paddingLeft: '15px' }}
          >
            <AvatarBase />
          </Grid>
          <Grid sx={{ margin: 'auto' }}>
            <Typography sx={{ margin: 'auto' }}>
              {chatId.slice(0, 11)}
            </Typography>
          </Grid>
          <Grid sx={{ paddingRight: '15px' }}>
            <IconButton sx={{ borderRadius: 0 }} onClick={onSubmit}>
              <Typography sx={{ paddingRight: '10px', color: '#fff' }}>
                Logout
              </Typography>
              <Logout sx={{ color: '#fff' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

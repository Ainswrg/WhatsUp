import Logout from '@mui/icons-material/Logout'
import { AppBar, Grid, Toolbar, IconButton, Typography } from '@mui/material'
import React, { type FC } from 'react'

import { AvatarBase } from 'widgets/Avatar/Avatar'

export const Navbar: FC = () => {
  return (
    <AppBar position='static' sx={{ background: '#202C33' }}>
      <Toolbar>
        <Grid container justifyContent={'space-between'}>
          <AvatarBase />
          <IconButton>
            <Typography sx={{ paddingRight: '10px', color: '#fff' }}>
              Logout
            </Typography>
            <Logout sx={{ color: '#fff' }} />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
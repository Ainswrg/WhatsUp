import { AppBar, Toolbar, Typography } from '@mui/material'
import React, { type FC } from 'react'

export const Header: FC = () => {
  return (
    <AppBar position='static' sx={{ background: '#202C33' }}>
      <Toolbar>
        <Typography variant='h6'>Header</Typography>
      </Toolbar>
    </AppBar>
  )
}

import { Box, Grid, Typography } from '@mui/material'
import { FC } from 'react'

import { AvatarBase } from 'widgets/Avatar/Avatar'

export const Contact: FC = (props) => {
  const handleClick = () => {
    console.log('click')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem',
        borderBottom: '1px solid #606060',
        cursor: 'pointer',
        '&:hover': {
          background: '#222E35'
        }
      }}
      onClick={handleClick}
    >
      <Grid container alignItems='center'>
        <Grid item>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '10px'
            }}
          >
            <AvatarBase />
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ padding: '0' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', color: '#fff' }}>
            <Typography variant='body1'>{'contact.name'}</Typography>
            <Typography variant='body2'>{'last message'}</Typography>
          </Box>
        </Grid>
        <Grid item sx={{ border: '0' }}>
          <Typography sx={{ color: '#404040' }}>{'time'}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

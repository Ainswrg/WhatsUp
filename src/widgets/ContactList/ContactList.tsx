import { Paper, Box, Grid } from '@mui/material'

import { type FC } from 'react'

import ButtonAdd from 'widgets/ButtonAdd/ButtonAdd'
import { Contact } from 'widgets/Contact/Contact'

export const ContactList: FC = (props) => {
  return (
    <Box component={Paper} sx={{ background: '#111B21' }}>
      <Grid container direction='column'>
        <Grid item sx={{ borderBottom: '0.5px solid #404040' }}>
          <ButtonAdd />
        </Grid>
        <Grid item xs>
          <Box sx={{ height: '70vh', overflow: 'auto' }}>
            <Contact />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

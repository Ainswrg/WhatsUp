import { Paper, Box, Grid } from '@mui/material'

import { type FC } from 'react'

import { useAppSelector } from 'app/hooks'

import { selectChats } from 'features/Chat/selectors'
import ButtonAdd from 'widgets/ButtonAdd/ButtonAdd'
import { Contact } from 'widgets/Contact/Contact'

export const ContactList: FC = (props) => {
  const chats = useAppSelector(selectChats)
  return (
    <Box component={Paper} sx={{ background: '#111B21' }}>
      <Grid container direction='column'>
        <Grid item sx={{ borderBottom: '0.5px solid #404040' }}>
          <ButtonAdd />
        </Grid>
        <Grid item xs>
          <Box sx={{ height: '70vh', overflow: 'auto' }}>
            {chats.map((contact) => {
              return <Contact key={contact.id} chat={contact} />
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

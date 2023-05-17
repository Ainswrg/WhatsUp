import { Paper, TextField, Button, Grid, type Theme, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { type FC } from 'react'

import { Message } from 'widgets/Message/Message'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '100%',
    height: '100%',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between'
  }
}))

export const ChatWindow: FC = () => {
  const classes = useStyles()

  return (
    <Paper
      elevation={3}
      className={classes.paper}
      sx={{ background: 'transparent' }}
    >
      <Grid sx={{ height: '90%' }}>
        <Box sx={{ height: '80vh', overflowY: 'auto' }}>
          <Message user={'User 1'} message={'Hi!'} />
          <Message user={'User 2'} message={'Hello!'} />
        </Box>
      </Grid>

      <div style={{ display: 'flex', background: '#202C33' }}>
        <TextField
          variant='outlined'
          placeholder='Enter message'
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button variant='contained' color='primary'>
          Send
        </Button>
      </div>
    </Paper>
  )
}

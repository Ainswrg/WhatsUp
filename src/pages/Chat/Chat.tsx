import { Container, Grid } from '@mui/material'

import { useEffect, type FC } from 'react'

import { useAppDispatch } from 'app/hooks'
import { getChats } from 'features/Chat/slice'

import { AddNumberModal } from 'widgets/AddNumberModal/AddNumberModal'
import { ChatWindow } from 'widgets/ChatWindow/ChatWindow'
import { ContactList } from 'widgets/ContactList/ContactList'
import { Navbar } from 'widgets/Navbar/Navbar'

const classes = {
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebar: {
    height: '100%',
    background: '#111B21',
    borderRight: '1px solid #404040'
  }
}

const Chat: FC = () => {
  const backgroundImageUrl = 'url("background.jpg")'
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getChats())
  }, [])

  return (
    <>
      <AddNumberModal />
      <Container sx={classes.root} maxWidth={false} disableGutters>
        <Navbar />
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid sx={classes.sidebar} item xs={5}>
            <ContactList />
          </Grid>
          <Grid
            item
            xs={7}
            sx={{
              background: `linear-gradient(to top, rgba(11,20,26, 0.95), rgba(11,20,26, 0.95)), ${backgroundImageUrl}`,
              backgroundSize: 'contain'
            }}
          >
            <ChatWindow />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Chat

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import { type FC } from 'react'

import { Header } from 'widget/Header/Header'

const Chat: FC = (props) => {
  const backgroundImageUrl = 'url("background.jpg")'

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={3} sx={{ height: '100%', background: '#111B21' }}>
          Contact List
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            background: `linear-gradient(to top, rgba(11,20,26, 0.9), rgba(11,20,26, 0.9)), ${backgroundImageUrl}`,
            backgroundSize: 'contain'
          }}
        >
          Chat
        </Grid>
      </Grid>
    </Container>
  )
}

export default Chat

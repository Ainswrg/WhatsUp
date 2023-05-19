import { Grid, Avatar, Typography, type Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { type FC } from 'react'

import { IMessage } from 'entities/Message'

const useStyles = makeStyles((theme: Theme) => ({
  messageBody: {
    background: '#202C33',
    borderRadius: '15px',
    padding: 15,
    color: '#fff'
  },
  avatar: {
    margin: '0 15px'
  }
}))

const contact = {
  display: 'inline-flex',
  padding: '5px 0',
  borderRadius: '15px'
}

export const Message: FC<IMessage> = ({ chatId, textMessage }) => {
  const classes = useStyles()
  const me: string = 'User 1'
  const isMe = Boolean(chatId === me)

  return (
    <Grid
      container
      alignItems={'center'}
      sx={{
        contact,
        flexDirection: isMe ? 'row-reverse' : 'row',
        margin: '0.4rem 0'
      }}
    >
      <Avatar className={classes.avatar} />
      <Grid className={classes.messageBody}>
        <Typography variant={'h6'}>{chatId}</Typography>
        <Typography variant={'body2'}>{textMessage}</Typography>
      </Grid>
    </Grid>
  )
}

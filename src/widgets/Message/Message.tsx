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

export const Message: FC<IMessage> = ({ senderData, message }) => {
  const classes = useStyles()

  const name = senderData?.sender
  const isMe = !(senderData?.sender === senderData.chatId)
  const direction = isMe ? 'row-reverse' : 'row'

  return (
    <Grid
      container
      alignItems={'center'}
      sx={{
        contact,
        flexDirection: direction,
        margin: '0.4rem 0'
      }}
    >
      <Avatar className={classes.avatar} />
      <Grid className={classes.messageBody}>
        <Typography variant={'h6'}>{name}</Typography>
        <Typography variant={'body2'}>{message}</Typography>
      </Grid>
    </Grid>
  )
}

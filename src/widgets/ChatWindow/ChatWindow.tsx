import {
  Paper,
  TextField,
  Button,
  Grid,
  type Theme,
  Box,
  Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import { useEffect, type FC, useRef } from 'react'

import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectChatId } from 'features/AddContact/selectors'
import { selectIsAuth } from 'features/Auth/selectors'
import { selectNotificationLog } from 'features/Chat/selectors'

import {
  deleteNotification,
  fetchNotification,
  sendMessage
} from 'features/Chat/slice'
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

interface MessageBody {
  message: string
}

export const ChatWindow: FC = () => {
  const dispatch = useAppDispatch()
  const notificationLog = useAppSelector(selectNotificationLog)
  const classes = useStyles()
  const chatId = useAppSelector(selectChatId)
  const isAuth = useAppSelector(selectIsAuth)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const filteredArr = notificationLog.filter((user) => {
    return user.body.senderData.chatId === chatId
  })

  useEffect(() => {
    const pollNotifications = async () => {
      const response = await dispatch(fetchNotification()).unwrap()

      if (response?.receiptId) {
        await dispatch(deleteNotification(response.receiptId))
      }
    }
    if (isAuth) {
      intervalRef.current = setInterval(() => {
        pollNotifications()
      }, 6000)
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    }

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    }
  }, [dispatch, isAuth])

  const onSubmit = (value: MessageBody) => {
    dispatch(sendMessage(value.message))
    reset()
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<MessageBody>({
    defaultValues: {
      message: ''
    },
    mode: 'onChange'
  })

  return chatId ? (
    <Paper
      elevation={3}
      className={classes.paper}
      sx={{ background: 'transparent' }}
    >
      <Grid sx={{ height: '90%' }}>
        <Box sx={{ height: '80vh', overflowY: 'auto' }}>
          {filteredArr.reverse().map((user) => {
            const messageData = user?.body?.messageData
            const message = messageData.hasOwnProperty('textMessageData')
              ? messageData.textMessageData.textMessage
              : messageData.extendedTextMessageData.text
            const isMe = chatId === user?.body?.instanceData?.wid
            return (
              <Message
                key={user?.body?.idMessage}
                name={user?.body?.senderData?.senderName}
                message={message}
                isMe={isMe}
              />
            )
          })}
        </Box>
      </Grid>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', background: '#202C33' }}
      >
        <TextField
          variant='outlined'
          placeholder='Enter message'
          style={{ flex: 1, marginRight: 8 }}
          {...register('message', {
            minLength: 1
          })}
        />
        <Button
          variant='contained'
          type='submit'
          color='primary'
          disabled={!isValid || !chatId}
        >
          Send
        </Button>
      </form>
    </Paper>
  ) : (
    <Paper
      elevation={3}
      className={classes.paper}
      sx={{ background: '#222E35' }}
    >
      <Grid
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ display: 'content' }}
      >
        <img src='web.png' alt='' style={{ paddingTop: '1rem' }} />
        <Typography variant={'h5'} sx={{ textAlign: 'center' }}>
          Web
        </Typography>
        <Typography sx={{ textAlign: 'center', paddingTop: '1.2rem' }}>
          Get and send message
        </Typography>
      </Grid>
    </Paper>
  )
}

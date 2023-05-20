import { Paper, TextField, Button, Grid, type Theme, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { useEffect, type FC, useRef } from 'react'

import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectChatId } from 'features/AddContact/selectors'
import { selectIsAuth } from 'features/Auth/selectors'
import { selectChatHistory } from 'features/Chat/selectors'

import {
  deleteNotification,
  fetchNotification,
  getChatHistory,
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
  const chatHistory = useAppSelector(selectChatHistory)
  const classes = useStyles()
  const chatId = useAppSelector(selectChatId)
  const isAuth = useAppSelector(selectIsAuth)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (chatId) {
      dispatch(getChatHistory(chatId))
    }
  }, [chatId])

  useEffect(() => {
    const pollNotifications = async () => {
      const response = await dispatch(fetchNotification()).unwrap()
      console.log('notification:', response)

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
  }, [isAuth])

  const onSubmit = (value: MessageBody) => {
    dispatch(sendMessage(value.message))
    dispatch(getChatHistory(chatId))
  }

  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<MessageBody>({
    defaultValues: {
      message: ''
    },
    mode: 'onChange'
  })

  return (
    <Paper
      elevation={3}
      className={classes.paper}
      sx={{ background: 'transparent' }}
    >
      <Grid sx={{ height: '90%' }}>
        <Box sx={{ height: '80vh', overflowY: 'auto' }}>
          {[...chatHistory].reverse().map((user, id) => (
            <Message
              key={id}
              chatId={user.chatId}
              textMessage={user.textMessage}
            />
          ))}
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
            required: 'message is required field!',
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
  )
}

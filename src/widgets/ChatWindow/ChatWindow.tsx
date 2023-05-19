import { Paper, TextField, Button, Grid, type Theme, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { useEffect, type FC } from 'react'

import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectChatId } from 'features/AddContact/selectors'
import { selectChatHistory } from 'features/Chat/selectors'

import { getChatHistory, sendMessage } from 'features/Chat/slice'
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

  useEffect(() => {
    if (chatId) {
      dispatch(getChatHistory(chatId))
    }
  }, [chatId])

  const onSubmit = (value: MessageBody) => {
    console.log('values :', value.message)
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
          {[...chatHistory].reverse().map((user) => (
            <Message
              key={user.idMessage}
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

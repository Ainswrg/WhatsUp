import { Box, Grid, Typography } from '@mui/material'

import { FC } from 'react'

import { useAppDispatch } from 'app/hooks'
import { Chat } from 'entities/Chat'

import { setChatId } from 'features/AddContact/slice'
import { AvatarBase } from 'widgets/Avatar/Avatar'

interface Props {
  chat: Chat
}

export const Contact: FC<Props> = ({ chat }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(setChatId(chat.id))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem',
        borderBottom: '1px solid #606060',
        cursor: 'pointer',
        '&:hover': {
          background: '#222E35'
        }
      }}
      onClick={handleClick}
    >
      <Grid container alignItems='center'>
        <Grid item>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '10px'
            }}
          >
            <AvatarBase />
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ padding: '0' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', color: '#fff' }}>
            <Typography variant='body1'>
              {chat.name || chat.id.replace(/[@g.us | @c.us]/g, '')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

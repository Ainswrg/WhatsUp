import {
  Box,
  ListItemAvatar,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import { type FC } from 'react'

import { AvatarBase } from 'widgets/Avatar/Avatar'

export const Contact: FC = (props) => {
  const handleClick = () => {
    console.log('click')
  }

  return (
    <TableRow
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
      <Box sx={{ display: 'flex' }}>
        <TableCell
          colSpan={2}
          sx={{
            padding: '0',
            border: '0',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ListItemAvatar
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '0'
            }}
          >
            <AvatarBase />
          </ListItemAvatar>
        </TableCell>
        <TableCell colSpan={8} sx={{ padding: '0', border: '0' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', color: '#fff' }}>
            <Typography variant={'body1'}>{'contact.name'}</Typography>
            <Typography variant={'body2'}>{'last message'}</Typography>
          </Box>
        </TableCell>
      </Box>
      <TableCell colSpan={2} align='right' sx={{ border: '0' }}>
        <Typography sx={{ color: '#404040' }}>{'time'}</Typography>
      </TableCell>
    </TableRow>
  )
}

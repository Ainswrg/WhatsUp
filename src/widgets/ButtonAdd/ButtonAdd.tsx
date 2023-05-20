import PersonAdd from '@mui/icons-material/PersonAdd'
import { IconButton, Typography } from '@mui/material'

import { type FC } from 'react'

import { useAppDispatch } from 'app/hooks'

import { setOpenModal } from 'features/Contact/slice'

const ButtonAdd: FC = (props) => {
  const dispatch = useAppDispatch()
  const handleOpen = (): void => {
    dispatch(setOpenModal(true))
  }

  return (
    <IconButton
      sx={{ color: '#c0c0c0', borderRadius: '0' }}
      aria-label='edit'
      onClick={handleOpen}
    >
      <PersonAdd sx={{ paddingRight: '15px' }} />
      <Typography>Add contact</Typography>
    </IconButton>
  )
}

export default ButtonAdd

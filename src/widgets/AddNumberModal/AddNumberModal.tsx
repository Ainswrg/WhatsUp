import { Paper, TextField } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { type FC } from 'react'

import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectIsModalOpen } from 'features/AddContact/selectors'
import { setOpenModal, setChatId } from 'features/AddContact/slice'
import { convertNumberToWhatsAppId } from 'shared/convertNumberToWhatsUpId'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export const AddNumberModal: FC = () => {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectIsModalOpen)

  interface Params {
    phone: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Params>({
    defaultValues: {
      phone: ''
    },
    mode: 'onChange'
  })

  const handleClose = (): void => {
    dispatch(setOpenModal(false))
  }

  const onSubmit = async (value: Params) => {
    const formattedNumber = convertNumberToWhatsAppId(value.phone)
    dispatch(setChatId(formattedNumber))
    handleClose()
  }

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Paper>
              <Typography variant='h5' textAlign={'center'}>
                Add contact
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label='Phone'
                  fullWidth
                  required
                  {...register('phone', {
                    required: 'phone is required field!',
                    minLength: 10
                  })}
                  error={Boolean(errors.phone?.message)}
                  helperText={errors.phone?.message}
                />
                <Button
                  disabled={!isValid}
                  type='submit'
                  size='large'
                  variant='contained'
                  fullWidth
                >
                  Add
                </Button>
              </form>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

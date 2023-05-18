import { FormHelperText, Paper, TextField } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { type FormEvent, type FC } from 'react'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectIsModalOpen } from 'features/AddContact/selectors'
import { setOpenModal } from 'features/AddContact/slice'

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

  const handleClose = (): void => {
    dispatch(setOpenModal(false))
  }

  let status = 'success'
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const phoneInput = e.currentTarget.elements.namedItem('phone')
    const phone = phoneInput instanceof HTMLInputElement ? phoneInput.value : ''
    // const contact = { phone }
    // await dispatch(addContact(contact))
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
              <form>
                <TextField
                  label='Phone'
                  name='phone'
                  helperText={''}
                  fullWidth
                  required
                />
                {status === 'failed' ? (
                  <FormHelperText
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    error
                  >
                    {'Error'}
                  </FormHelperText>
                ) : (
                  <Typography sx={{ paddingTop: '23px' }}></Typography>
                )}
                <Button
                  disabled={status === 'loading'}
                  type='submit'
                  size='large'
                  variant='contained'
                  fullWidth
                  onClick={handleClose}
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

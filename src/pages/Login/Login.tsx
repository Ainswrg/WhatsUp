import LoadingButton from '@mui/lab/LoadingButton'
import { Container, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from 'app/hooks'

import { AuthParams } from 'entities/Authentication'
import { selectStatus } from 'features/Auth/selectors'
import { fetchAuth } from 'features/Auth/slice'

import type { FC } from 'react'

const classes = {
  root: {
    width: '100%',
    height: '100vh',
    background: '#111B21',
    paddingTop: '50px'
  },
  window: {
    width: '400px',
    padding: '50px',
    border: '1px solid #dedede',
    margin: '0 auto',
    background: '#fff'
  },
  field: {
    marginBottom: '20px'
  },
  title: {
    textAlign: 'center',
    fontweight: 'bold',
    marginBottom: '30px'
  }
}

const Login: FC = React.memo(function Login() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AuthParams>({
    defaultValues: {
      idInstance: '',
      apiTokenInstance: ''
    },
    mode: 'onChange'
  })
  const status = useAppSelector(selectStatus)

  const onSubmit = async (values: AuthParams): Promise<void> => {
    try {
      const isUserAuth = await dispatch(fetchAuth(values)).unwrap()
      console.log(isUserAuth)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container sx={classes.root}>
      <Paper sx={classes.window}>
        <Typography sx={classes.title} variant='h5'>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={classes.field}
            {...register('idInstance', {
              required: 'idInstance is required field!',
              minLength: 9
            })}
            label={status === 'failed' ? 'Error' : 'idInstance'}
            fullWidth
            error={status === 'failed' || Boolean(errors.idInstance?.message)}
            helperText={errors.idInstance?.message}
          />
          <TextField
            sx={classes.field}
            {...register('apiTokenInstance', {
              required: 'apiTokenInstance is required field!',
              minLength: 49
            })}
            label='apiTokenInstance'
            type='apiTokenInstance'
            error={
              status === 'failed' || Boolean(errors.apiTokenInstance?.message)
            }
            helperText={errors.apiTokenInstance?.message}
            fullWidth
          />
          <LoadingButton
            disabled={!isValid}
            type='submit'
            size='large'
            variant='contained'
            fullWidth
            loading={status === 'loading'}
          >
            Login
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  )
})

export default Login

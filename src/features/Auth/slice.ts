import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Reducer
} from '@reduxjs/toolkit'

import Cookies from 'js-cookie'

import { AuthParams, AuthState, IAuth } from 'entities/Authentication'

import axios from 'shared/axios'
import { getLocalStorage, setLocalStorage } from 'shared/locStorage'

interface IMeta {
  requestId: string
  requestStatus: string
  arg: AuthParams
}

export const fetchAuth = createAsyncThunk<IAuth, AuthParams>(
  'auth/fetchAuth',
  async ({ idInstance, apiTokenInstance }) => {
    const { data } = await axios.get<IAuth>(
      `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    )
    return data
  }
)

const initialState: AuthState = {
  authorization: getLocalStorage(),
  status: 'idle'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.authorization = null
      Cookies.remove('idInstance')
      Cookies.remove('apiTokenInstance')
      setLocalStorage(null)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state: AuthState) => {
        state.status = 'loading'
        state.authorization = null
      })
      .addCase(
        fetchAuth.fulfilled,
        (state: AuthState, action: PayloadAction<IAuth, string, IMeta>) => {
          state.status = 'success'
          state.authorization = action.payload.stateInstance
          Cookies.set('idInstance', action.meta.arg.idInstance)
          Cookies.set('apiTokenInstance', action.meta.arg.apiTokenInstance)
          setLocalStorage('auth')
        }
      )
      .addCase(fetchAuth.rejected, (state: AuthState) => {
        state.status = 'failed'
        state.authorization = null
      })
  }
})

export const authReducer: Reducer<AuthState> = authSlice.reducer
export const { logout } = authSlice.actions

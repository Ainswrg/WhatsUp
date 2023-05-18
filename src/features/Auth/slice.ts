import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Reducer
} from '@reduxjs/toolkit'

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
  status: 'idle',
  idInstance: null,
  apiTokenInstance: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.authorization = null
      state.idInstance = null
      state.apiTokenInstance = null
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
          state.idInstance = action.meta.arg.idInstance
          state.apiTokenInstance = action.meta.arg.apiTokenInstance
          setLocalStorage('auth')
          console.log('action: ', action)
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

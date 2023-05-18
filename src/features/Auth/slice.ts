import {
  AnyAction,
  PayloadAction,
  Reducer,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'

import { AuthParams, AuthState, IAuth } from 'entities/Authentication'

import axios from 'shared/axios'
import { getLocalStorage, setLocalStorage } from 'shared/locStorage'

export const fetchAuth = createAsyncThunk<IAuth, AuthParams>(
  'auth/fetchAuth',
  async ({ idInstance, apiTokenInstance }) => {
    const { data } = await axios.get<IAuth>(
      `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    )
    return data
  }
)

interface IAction {
  stateInstance: 'authorization' | null
}

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
        (state: AuthState, action: PayloadAction<IAction>) => {
          state.status = 'success'
          state.authorization = action.payload.stateInstance
          setLocalStorage('auth')
          console.log('action payload', action.payload)
        }
      )
      .addCase(fetchAuth.rejected, (state: AuthState) => {
        state.status = 'failed'
        state.authorization = null
      })
  }
})

export const authReducer: Reducer<AuthState, AnyAction> = authSlice.reducer
export const { logout } = authSlice.actions

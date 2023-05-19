import { configureStore } from '@reduxjs/toolkit'

import { contactReducer } from 'features/AddContact/slice'
import { authReducer } from 'features/Auth/slice'
import { chatReducer } from 'features/Chat/slice'

import type { ThunkAction, Action } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    chat: chatReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

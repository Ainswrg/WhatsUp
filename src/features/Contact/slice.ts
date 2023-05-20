import {
  type PayloadAction,
  createSlice,
  type AnyAction,
  type Reducer
} from '@reduxjs/toolkit'

import { ContactState } from 'entities/Contact'

const initialState: ContactState = {
  isOpenModal: false,
  chatId: ''
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload
    },
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload
    }
  }
})

export const contactReducer: Reducer<ContactState, AnyAction> =
  contactSlice.reducer
export const { setOpenModal, setChatId } = contactSlice.actions

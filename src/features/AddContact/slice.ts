import {
  type PayloadAction,
  createSlice,
  type AnyAction,
  type Reducer
} from '@reduxjs/toolkit'

export interface ContactState {
  isOpenModal: boolean
}

const initialState: ContactState = {
  isOpenModal: false
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload
    }
  }
})

export const contactReducer: Reducer<ContactState, AnyAction> =
  contactSlice.reducer
export const { setOpenModal } = contactSlice.actions

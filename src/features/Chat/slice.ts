import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  Reducer
} from '@reduxjs/toolkit'

import Cookies from 'js-cookie'

import { Chat, ChatState } from 'entities/Chat'

import axios from 'shared/axios'

export const fetchChat = createAsyncThunk(
  'chat/fetchChat',
  async (message, { getState }) => {
    const idInstance = Cookies.get('idInstance')
    const apiTokenInstance = Cookies.get('apiTokenInstance')
    await axios.post(
      `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      message
    )
  }
)

export const getChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, { getState }) => {
    const idInstance = Cookies.get('idInstance')
    const apiTokenInstance = Cookies.get('apiTokenInstance')
    const response = await axios.get(
      `waInstance${idInstance}/getChats/${apiTokenInstance}`
    )
    const chats = response.data
    return chats
  }
)

const initialState: ChatState = {
  chatId: '',
  message: '',
  chats: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChat.pending, (state: ChatState) => {
        state.chatId = ''
        state.message = ''
      })
      .addCase(
        fetchChat.fulfilled,
        (state: ChatState, action: PayloadAction<any>) => {
          state.chatId = action.payload.chatId
          state.message = action.payload.message
        }
      )
      .addCase(fetchChat.rejected, (state: ChatState) => {
        state.chatId = ''
        state.message = ''
      })
      .addCase(getChats.pending, (state: ChatState) => {
        state.chats = []
      })
      .addCase(
        getChats.fulfilled,
        (state: ChatState, action: PayloadAction<Chat>) => {
          state.chats.push(action.payload)
          console.log('action.payload: ', action.payload)
        }
      )
      .addCase(getChats.rejected, (state: ChatState) => {
        state.chats = []
      })
  }
})

export const chatReducer: Reducer<ChatState> = chatSlice.reducer

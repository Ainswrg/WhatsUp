import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  Reducer
} from '@reduxjs/toolkit'

import Cookies from 'js-cookie'

import { RootState } from 'app/store'
import { Chat, ChatHistory, ChatState } from 'entities/Chat'

import axios from 'shared/axios'

export const sendMessage = createAsyncThunk<void, string>(
  'chat/fetchChat',
  async (message, { getState }) => {
    const { chatId } = (getState() as RootState).contact
    const idInstance = Cookies.get('idInstance')
    const apiTokenInstance = Cookies.get('apiTokenInstance')
    console.log('message from slice: ', message)
    await axios
      .post(`waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        chatId: chatId,
        message: message
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
)

export const getChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, { getState }) => {
    const idInstance = Cookies.get('idInstance')
    const apiTokenInstance = Cookies.get('apiTokenInstance')
    const response = await axios
      .get(`waInstance${idInstance}/getChats/${apiTokenInstance}`)
      .catch((error) => {
        console.error('Error:', error)
      })
    const chats = response?.data
    return chats
  }
)

export const getChatHistory = createAsyncThunk<ChatHistory[], string>(
  'chat/fetchChatHistory',
  async (chatId, { getState }) => {
    const idInstance = Cookies.get('idInstance')
    const apiTokenInstance = Cookies.get('apiTokenInstance')
    const response = await axios
      .post(`waInstance${idInstance}/getChatHistory/${apiTokenInstance}`, {
        chatId: chatId
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    const chatsHistory = response?.data
    return chatsHistory
  }
)

const initialState: ChatState = {
  message: '',
  chats: [],
  chatHistory: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state: ChatState) => {
        state.message = ''
      })
      .addCase(
        sendMessage.fulfilled,
        (state: ChatState, action: PayloadAction<any>) => {
          console.log('action: ', action)
          state.message = action.payload?.message
        }
      )
      .addCase(sendMessage.rejected, (state: ChatState) => {
        state.message = ''
      })
      .addCase(getChats.pending, (state: ChatState) => {
        state.chats = []
      })
      .addCase(
        getChats.fulfilled,
        (state: ChatState, action: PayloadAction<Chat[]>) => {
          state.chats = action.payload
        }
      )
      .addCase(getChats.rejected, (state: ChatState) => {
        state.chats = []
      })
      .addCase(getChatHistory.pending, (state: ChatState) => {
        state.chatHistory = []
      })
      .addCase(
        getChatHistory.fulfilled,
        (state: ChatState, action: PayloadAction<ChatHistory[]>) => {
          state.chatHistory = action.payload
        }
      )
      .addCase(getChatHistory.rejected, (state: ChatState) => {
        state.chatHistory = []
      })
  }
})

export const chatReducer: Reducer<ChatState> = chatSlice.reducer

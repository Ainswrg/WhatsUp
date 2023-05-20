import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  Reducer
} from '@reduxjs/toolkit'

import Cookies from 'js-cookie'

import { RootState } from 'app/store'
import { Chat, ChatState, INotification } from 'entities/Chat'

import axios from 'shared/axios'

export const sendMessage = createAsyncThunk<void, string>(
  'chat/fetchChat',
  async (message, { getState }) => {
    const { chatId } = (getState() as RootState).contact
    const idInstance = Cookies.get('idInstance')
    const apiTokenInstance = Cookies.get('apiTokenInstance')
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

export const fetchNotification = createAsyncThunk<INotification>(
  'chat/fetchNotification',
  async () => {
    const idInstance = Cookies.get('idInstance')
    const apiTokenInstance = Cookies.get('apiTokenInstance')
    const response = await axios
      .get(`waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
      .catch((error) => {
        console.error('Error:', error)
      })
    const data = response?.data
    return data
  }
)

export const deleteNotification = createAsyncThunk<void, number>(
  'chat/deleteNotification',
  async (id) => {
    const idInstance = Cookies.get('idInstance')
    const apiTokenInstance = Cookies.get('apiTokenInstance')
    await axios
      .delete(
        `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${id}`
      )
      .catch((error) => {
        console.error('Error:', error)
      })
  }
)

const initialState: ChatState = {
  chats: [],
  notificationLog: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(
        fetchNotification.fulfilled,
        (state: ChatState, action: PayloadAction<INotification>) => {
          if (action.payload?.body?.hasOwnProperty('senderData')) {
            state.notificationLog.push(action.payload)
          }
        }
      )
  }
})

export const chatReducer: Reducer<ChatState> = chatSlice.reducer

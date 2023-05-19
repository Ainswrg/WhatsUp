import { Chat, ChatHistory } from 'entities/Chat'

import type { RootState } from 'app/store'

export const selectChats = (state: RootState): Chat[] => state.chat.chats
export const selectChatHistory = (state: RootState): ChatHistory[] =>
  state.chat.chatHistory

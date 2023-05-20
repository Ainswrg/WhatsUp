import { Chat } from 'entities/Chat'

import type { RootState } from 'app/store'

export const selectChats = (state: RootState): Chat[] => state.chat.chats
export const selectNotificationLog = (state: RootState) =>
  state.chat.notificationLog

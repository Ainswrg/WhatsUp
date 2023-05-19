interface Chat {
  archive: boolean
  id: string
  notSpam: boolean
  ephemeralExpiration: number
  ephemeralSettingTimestamp: number
  name?: string
}

interface ChatState {
  chatId: string
  message: string
  chats: Chat[]
}

export type { Chat, ChatState }

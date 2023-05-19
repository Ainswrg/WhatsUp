interface Chat {
  archive: boolean
  id: string
  notSpam: boolean
  ephemeralExpiration: number
  ephemeralSettingTimestamp: number
  name?: string
}

interface ChatHistory {
  type: string
  idMessage: string
  timestamp: number
  typeMessage: string
  chatId: string
  downloadUrl?: string
  caption?: string
  fileName?: string
  jpegThumbnail?: string
  statusMessage: string
  sendByApi: false
  textMessage?: string
}

interface ChatState {
  message: string
  chats: Chat[]
  chatHistory: ChatHistory[]
}

export type { Chat, ChatState, ChatHistory }

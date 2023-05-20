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

interface INotification {
  receiptId: number
  body: {
    typeWebhook: string
    instanceData: {
      idInstance: number
      wid: string
      typeInstance: string
    }
    timestamp: number
    idMessage: string
    senderData: {
      chatId: string
      chatName: string
      sender: string
      senderName: string
    }
    messageData: {
      typeMessage: string
      textMessageData: {
        textMessage: string
      }
      extendedTextMessageData: {
        text: string
        description: string
        title: string
        previewType: string
        jpegThumbnail: string
      }
    }
  }
}
interface ChatState {
  message: string
  chats: Chat[]
  chatHistory: ChatHistory[]
  notification: INotification | null
  deleteStatus: boolean
  notificationLog: INotification[]
}

export type { Chat, ChatState, ChatHistory, INotification }

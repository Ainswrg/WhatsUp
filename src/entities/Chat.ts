interface Chat {
  archive: boolean
  id: string
  notSpam: boolean
  ephemeralExpiration: number
  ephemeralSettingTimestamp: number
  name?: string
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
  chats: Chat[]
  notificationLog: INotification[]
}

export type { Chat, ChatState, INotification }

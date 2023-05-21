export interface IMessage {
  senderData: {
    chatId: string
    chatName: string
    sender: string
    senderName: string
  }
  message: string
}

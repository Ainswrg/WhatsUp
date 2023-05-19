import { ChatHistory } from './Chat'

export interface IMessage extends Pick<ChatHistory, 'chatId' | 'textMessage'> {}

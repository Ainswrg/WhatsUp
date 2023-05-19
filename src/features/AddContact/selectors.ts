import { type RootState } from 'app/store'

const selectIsModalOpen = (state: RootState): boolean =>
  state.contact.isOpenModal
const selectChatId = (state: RootState): string => state.contact.chatId

export { selectIsModalOpen, selectChatId }

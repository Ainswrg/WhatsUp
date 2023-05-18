import { type RootState } from 'app/store'

const selectIsModalOpen = (state: RootState): boolean =>
  state.contact.isOpenModal

export { selectIsModalOpen }

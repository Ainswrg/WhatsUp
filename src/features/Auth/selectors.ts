import type { RootState } from 'app/store'

export const selectIsAuth = (state: RootState): boolean =>
  Boolean(state.auth.authorization)
export const selectStatus = (state: RootState) => state.auth.status

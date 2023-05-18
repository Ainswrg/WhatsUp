import type { RootState } from 'app/store'

export const selectIsAuth = (state: RootState): boolean =>
  Boolean(state.auth.authorization)
export const selectAuthState = (state: RootState) => state.auth
export const selectStatus = (state: RootState) => state.auth.status

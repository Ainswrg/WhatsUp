interface IAuth {
  stateInstance: null | string
}

interface AuthParams {
  idInstance: string
  apiTokenInstance: string
}

interface AuthState {
  authorization: string | null
  idInstance: string | null
  apiTokenInstance: string | null
  status: 'idle' | 'loading' | 'success' | 'failed'
}

export type { IAuth, AuthParams, AuthState }

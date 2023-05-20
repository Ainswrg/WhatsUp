interface IAuth {
  stateInstance: null | string
}

interface AuthParams {
  idInstance: string
  apiTokenInstance: string
}

interface AuthState {
  authorization: string | null
  status: 'idle' | 'loading' | 'success' | 'failed'
}

interface IMeta {
  requestId: string
  requestStatus: string
  arg: AuthParams
}

export type { IAuth, AuthParams, AuthState, IMeta }

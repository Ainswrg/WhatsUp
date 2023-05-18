type TGetToken = () => string | null
type TSetToken = (value: string | null) => void

export const setLocalStorage: TSetToken = (value: string | null) => {
  localStorage.setItem('isAuth', JSON.stringify(value))
}

export const getLocalStorage: TGetToken = () => {
  const json = localStorage.getItem('isAuth')

  if (!json) {
    return null
  }

  const value: string = JSON.parse(json)

  return value
}

import { createBrowserHistory as createHistory } from 'history'

let history

export const set = (nextHistory) => {
  history = nextHistory
}

export const get = () => {
  if (!history) {
    history = createHistory()
  }
  return history
}

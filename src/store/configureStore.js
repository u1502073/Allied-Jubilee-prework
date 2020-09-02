import { install as installReduxLoop, combineReducers } from 'redux-loop'
import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { compose, createStore, applyMiddleware } from "redux"
import reducers from "../reducers"


export default function configureStore(history, initialState) {
  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
  })
  const routerMiddleware = createRouterMiddleware(history)
  const middleware = [routerMiddleware]

  const enhancer = compose(
    installReduxLoop(),
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
  const store = createStore(rootReducer, initialState, enhancer)

  return store
}

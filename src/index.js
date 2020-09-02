import React from 'react';
import {render } from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router'

import App from './routes/app/App';
import actHistory from './actions/history'
import { get as getHistory } from './history'
import { ThemeProvider } from 'react-css-themr';
import configureStore from './store/configureStore'
import theme from './theme';

const history = getHistory()
const store = configureStore(history);

history.listen((location, action) => {
  const actionCreatorMap = {
    POP: actHistory.pop,
    PUSH: actHistory.push,
  }
  const c = actionCreatorMap[action]
  if (c) {
    store.dispatch(c(location))
  }
})

const renderApp = (AppComponent) => {
  render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppComponent />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  )
}

renderApp(App);

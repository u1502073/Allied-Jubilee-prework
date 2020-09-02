import { handleActions } from 'redux-actions'

import PropTypes from 'prop-types'
import { loop, Cmd } from 'redux-loop'
import * as api from '../api/orders'
import * as act from '../actions/orders'


export const shape = PropTypes.shape({
  lang: PropTypes.string,
})

const defaultState = {
  data: [],
  isLoading: false,
}
const reducer = handleActions({
  [act.get] (state) {
    const apiCall = api.getOrders;
    return loop(
      {
        ...state,
        data: [],
        isLoading: true,
      },
      Cmd.run(apiCall, {
        args: [],
        successActionCreator: act.get.success,
        failActionCreator: act.get.fail
      })
    );
  },
  [act.get.success] (state, { payload: data }) {
    return {
      ...state,
      isLoading: false,
      data: data.orders
    }
  },
  [act.get.fail] (state, { payload: err }) {
    return {
      ...state,
      isLoading: false,
      lastError: err,
    }
  }
}, defaultState)
export default reducer

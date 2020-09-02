import { createActions } from 'redux-actions'

const actionCreators = createActions({
  ORDERS: {
    GET: () => null,
    GET_SUCCESS: data => data,
    GET_FAIL: err => err,
  }
})

const {
  orders: {
    get,
    getSuccess,
    getFail
  }
} = actionCreators

get.success = getSuccess
get.fail = getFail

export {
  get
}

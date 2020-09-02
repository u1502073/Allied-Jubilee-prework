import { createActions } from 'redux-actions'

const actionCreators = createActions({
  VIDEOS: {
    GET: (data) => data,
    GET_SUCCESS: data => data,
    GET_FAIL: err => err,
    ADD_FAVORITE: () => null,
    ADD: id => id,
    DEL: id => id
  }
})

const {
  videos: {
    get,
    getSuccess,
    getFail,

    addFavorite,
    add,
    del,
  }
} = actionCreators

get.success = getSuccess
get.fail = getFail

export {
  get, add, del, addFavorite
}

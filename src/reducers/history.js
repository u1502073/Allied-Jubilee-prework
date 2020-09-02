import { handleActions } from 'redux-actions'
import PropTypes from 'prop-types'

import act from '../actions/history'

const maxStack = 10

export const locationShape = PropTypes.shape({
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
  state: PropTypes.object,
  key: PropTypes.string,
})

export const shape = PropTypes.shape({
  location: locationShape,
  stack: PropTypes.arrayOf(locationShape),
})

const defaultState = {
  location: null,
  stack: [],
}

const reducer = handleActions({
  [act.pop] (state, { payload: location }) {
    const stack = [...state.stack]
    stack.pop()
    return {
      ...state,
      location,
      stack,
    }
  },
  [act.push] (state, { payload: location }) {
    const stack = [...state.stack, location]

    if(stack.length > maxStack) {
      stack.unshift()
    }

    return {
      ...state,
      location,
      stack,
    }
  }
}, defaultState)

export default reducer
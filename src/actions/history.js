import { createAction as c } from 'redux-actions'

const pop = c('HISTORY_POP', location => location)
const push = c('HISTORY_PUSH', location => location)

const act = { push, pop }
export default act
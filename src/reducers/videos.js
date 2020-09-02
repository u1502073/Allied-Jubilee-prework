import { handleActions } from 'redux-actions'

import PropTypes from 'prop-types'
import { loop, Cmd } from 'redux-loop'
import * as api from '../api/videos'
import * as act from '../actions/videos'
import storage from '../storage';

export const shape = PropTypes.shape({
  lang: PropTypes.string,
})

const STORAGE_FAVORITE = 'favorite_id';

const defaultState = {
  data: null,
  pageInfo: {},
  nextPageToken: null,
  favorite: [],
  isLoading: false,
}

let addFavorite = [];
let sgorageFavorite = [];

const reducer = handleActions({
  [act.get] (state, { payload: data }) {
    const apiCall = api.getVideos;
    return loop(
      {
        ...state,
        data: [],
        isLoading: true,
      },
      Cmd.run(apiCall, {
        args: [data],
        successActionCreator: act.get.success,
        failActionCreator: act.get.fail
      })
    );
  },
  [act.get.success] (state, { payload: data }) {
    storage.getItem(STORAGE_FAVORITE).then((favorite) => {
      sgorageFavorite = favorite;
      addFavorite = data.data.items.map(item => {
        
        if (!favorite) {
          return {
            ...item,
            favorite: false,
          }
        }
        else {
          return {
            ...item,
            favorite: favorite.reduce((a,b) => {
              return a || item.id === b.id
            },false)
          }
        }
      })
    });
    return loop(
      {
        ...state,
        isLoading: false,
        data: data.data.items,
        nextPageToken: data.data.nextPageToken,
        pageInfo: data.data.pageInfo
      },
      Cmd.setTimeout(Cmd.action(act.addFavorite()),100)
    )
  },
  [act.addFavorite] (state) {
    return {
      ...state,
      data: addFavorite,
      favorite: sgorageFavorite
    }
  },
  [act.get.fail] (state, { payload: err }) {
    return {
      ...state,
      isLoading: false,
      lastError: err,
    }
  },
  [act.add] (state, { payload: addItem }) {
    const favorite = state.favorite ? state.favorite : [];
    const data = state.data.map(item => {
      if (item.id === addItem.id) {
        return {
          ...item,
          favorite: true,
        }
      }
      else {
        return item
      }
    });
    // check id in favorite list
    const inFavorite = favorite.reduce((a, b) => {
      return a || b.id === addItem.id
    }, false)

    if (!inFavorite) {
      favorite.push({...addItem, favorite: true});
    }

    storage.setItem(STORAGE_FAVORITE, favorite);
    return {
      ...state,
      data: data,
      favorite
    }
  },
  [act.del] ( state, { payload: delItem }) {
    const favorite = state.favorite.filter(item => {
      return item.id !== delItem.id
    });
    storage.setItem(STORAGE_FAVORITE, favorite);
    const data = state.data.map(item => {
      if (item.id === delItem.id) {
        return {
          ...item,
          favorite: false,
        }
      }
      else {
        return item
      }
    });
    return {
      ...state,
      data: data,
      favorite
    }
  }
}, defaultState)
export default reducer

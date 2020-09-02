import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import svgFavorite from '../images/favorite.svg';
import svgFavoriteBorder from '../images/favorite_border.svg';
import theme from './VideoList.scss';
import { useDispatch } from 'react-redux';
import * as actVideo from '../actions/videos';
import { useHistory } from 'react-router';

const Item = ({ data }) => {
  const { favorite, snippet: { title, description, thumbnails }, contentDetails: { duration }} = data;
  const [show, setShow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setIsFavorite(favorite);
  },[favorite])
  const handleFavorite = () => {
    if (!isFavorite) {
      dispatch(actVideo.add(data))
    }
    else {
      dispatch(actVideo.del(data))
    }
    setIsFavorite(!isFavorite);
  }
  const handleClick = () => {
    history.push(`/play?title=${title}&description=${description}`);
  }
  return (
    <div style={{ maxWidth: `${thumbnails.high.width}px`}} className={theme.item} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div role="button" tabIndex={0} onClick={handleClick}>
        <img className={theme.img} src={thumbnails.high.url} alt=""/>
      </div>
      <div>
        <div className={theme.favorite} role="button" tabIndex={0} onClick={handleFavorite}>
          <img src={isFavorite ? svgFavorite : svgFavoriteBorder} alt="" />
        </div>
        <div style={{ padding: '0 20px'}}>{title}</div>
        <div>{duration.replace('PT', '').toLowerCase()}</div>
        {show && <div className={theme.description}>{description}</div>}
      </div>
    </div>
  )
}

Item.propTypes = {
  data: PropTypes.object,
}

const VideoList = ({ data }) => {
  return (
    <div className={theme.list}>
      {data.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  )
}

VideoList.propTypes = {
  data: PropTypes.array,
}

export default VideoList

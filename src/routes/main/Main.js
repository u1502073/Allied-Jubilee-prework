import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import PageLoading from '../../components/PageLoading';
import Pagination from "@material-ui/lab/Pagination";
import * as actVideos from "../../actions/videos";
import VideoList from '../../components/VideoList';
import { PERPAGE } from '../../config';
import theme from './Main.scss';

const Main = () => {
  const videos = useSelector(state => state.videos)
  const dispatch = useDispatch();
  const [page, setPage] = useState(null);
  const [index, setIndex] = useState(1);
  useEffect(() => {
    dispatch(actVideos.get())
  }, []);
  useEffect(() => {
    if (videos && videos.data) {
      const count = parseInt(videos.pageInfo.totalResults / PERPAGE,10) + 1
      setPage({
        count,
      })
    }
  },[videos])

  const handleChange = (evt, value) => {
    if (value > index) {
      dispatch(actVideos.get({token: videos.nextPageToken}))
    }
    else if (value < index) {
      dispatch(actVideos.get({token: videos.prevPageToken }))
    }
    setIndex(value);
  }
  return (
    <div className={theme.self}>
      {videos.data ? <VideoList data={videos.data}/> : <PageLoading />}
      {page && page.count > PERPAGE && <Pagination count={page.count} page={index} onChange={handleChange} color="secondary"/>}
    </div>
  )
}

export default Main

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import PageLoading from "../../components/PageLoading";
import * as actVideos from "../../actions/videos";
import VideoList from "../../components/VideoList";
import { PERPAGE } from '../../config';
import theme from "./Favorite.scss";

const Favorite = () => {
  const favorite = useSelector((state) => state.videos.favorite);
  const dispatch = useDispatch();
  // const [favorite, setFavorite] = useState(null);
  const [page, setPage] = useState(null);
  useEffect(() => {
    dispatch(actVideos.get());
  }, []);
  useEffect(() => {
    if (favorite && favorite.length > 0) {
      // const data = favorite.filter((item) => item.favorite);
      let count =  parseInt(favorite.length / PERPAGE,10);
      count += favorite.length % PERPAGE > 0 ? 1 : 0
      const index = page && page.page ? page.page : 1; 
      const pageData = favorite.slice((index - 1)* PERPAGE, index * PERPAGE);
      // setFavorite(data);
      setPage({
        count,
        page: index,
        pageData
      })
    }
  }, [favorite]);
  const handleChange = (evt, value) => {
    const pageData = favorite.slice((value - 1) * PERPAGE, value * PERPAGE);
    setPage({
      ...page,
      page: value,
      pageData
    })
  }

  return (
    <div className={theme.self}>
      {page && page.pageData ? <VideoList data={page.pageData} /> : <PageLoading />}
      {page && favorite && favorite.length > PERPAGE && <Pagination count={page.count} page={page.page} color="secondary" onChange={handleChange} />}
    </div>
  );
};

export default Favorite;

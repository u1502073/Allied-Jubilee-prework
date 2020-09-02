import * as op from './op';
import { PERPAGE } from '../config';

export function getVideos (data) {
  const defaultData = `part=snippet,contentDetails&chart=mostPopular&maxResults=${PERPAGE}${data && data.token ? `&pageToken=${data.token}` : ''}`;
  return op.get(`/youtube/v3/videos?${defaultData}`);
}
import { Video } from "../models/video";
import "./VideoList.scss";
import { VideoPreview } from "./VideoPreview";

interface VideoListParams {
  videos: Video[];
}

export function VideoList({ videos }: VideoListParams) {
  return (
    <div className="VideoList">
      {videos.map((video) => {
        return <VideoPreview video={video} key={video.id}></VideoPreview>;
      })}
    </div>
  );
}

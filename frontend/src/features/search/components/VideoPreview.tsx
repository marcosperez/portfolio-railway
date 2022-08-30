import { Video } from "../models/video";
import { motion } from "framer-motion";

import "./VideoPreview.scss";

interface VideoPreviewProps {
  video: Video;
}

export function VideoPreview({ video }: VideoPreviewProps) {
  return (
    <motion.div
      transition={{
        delay: 0.5,
        x: { duration: 1 },
        default: { ease: "linear" },
      }}
      className="VideoPreview"
    >
      <div className="ImgContainer">
        <img alt={video.title} src={video.getImgUrl()}></img>
      </div>
      <div className="Title" title={video.title}>
        <a target={"_blank"} href={video.getLink()} rel="noreferrer">
          {video.title}
        </a>
      </div>
      <div className="Subtitle">{video.subtitle}</div>
    </motion.div>
  );
}

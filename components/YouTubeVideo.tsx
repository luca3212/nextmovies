import React from "react";
import YouTube from "react-youtube";
import styles from "../styles/videoYouTube.module.scss";

interface Props {
  videoKey: string;
  title: string;
}

const VideoList: React.FC<Props> = ({ videoKey, title }) => {
  return (
    <div className={styles.trailer}>
      <h3>{title}</h3>

      <YouTube
        key={videoKey}
        videoId={videoKey}
        opts={{ playerVars: { origin: "https://nextmovies-five.vercel.app/" } }}
        className={styles.containVideo}
      />
    </div>
  );
};

export default VideoList;

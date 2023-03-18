import { useEffect, useRef, useState } from "react";

// import "./styles/style.css";

import Hls from "hls.js";

export const VideoPlayer = (videoLink, videoPoster) => {

  // Using for loading skeleton while fetching data
  const [loading, setLoading] = useState(true);

  const videoPlayer = useRef(null);

  useEffect(() => {
    setLoading(true);

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoLink);
    //   hls.attachMedia(videoPlayer);
      // hls.on(Hls.Events.MANIFEST_PARSED, function () {
      //   videoPlayer.play();
      // });
    } else if (videoPlayer.canPlayType("application/vnd.apple.mpeg")) {
      videoPlayer.src = videoLink;
      // videoPlayer.addEventListener("canplay", function () {
      //   videoPlayer.play();
      // });
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <>12345</>;
  }

  return (
    <>
      <video controls poster={videoPoster} ref={videoPlayer}></video>
    </>
  );
};

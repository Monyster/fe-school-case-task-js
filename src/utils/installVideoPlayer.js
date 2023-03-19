import Hls from "hls.js";

export const installVideoPlayer = (ref, videoLink) => {
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoLink);
    hls.attachMedia(ref.current);
  } else if (ref.current.canPlayType("application/vnd.apple.mpeg")) {
    ref.current.src = videoLink;
  }
};

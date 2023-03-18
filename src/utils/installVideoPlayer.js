import Hls from "hls.js";

export const installVideoPlayer = (ref, videoLink) => {
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoLink);
    hls.attachMedia(ref.current);
    // hls.on(Hls.Events.MANIFEST_PARSED, function () {
    //   videoPlayer.play();
    // });
  } else if (ref.current.canPlayType("application/vnd.apple.mpeg")) {
    ref.current.src = videoLink;
    // videoPlayer.addEventListener("canplay", function () {
    //   videoPlayer.play();
    // });
  }

  // ref.current.addEventListener("error", (event) => {
  //   console.log(event);
  // });
};

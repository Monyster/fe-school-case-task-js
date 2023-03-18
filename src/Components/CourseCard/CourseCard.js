import { NavLink } from "react-router-dom";
import "./styles/style.css";
import { Rating } from "@mui/material";
import { useRef } from "react";
import { installVideoPlayer } from "../../utils/installVideoPlayer";

export const CourseCard = ({ id, title, img, videoLink = "", description, lessonsCount, skills = [], rating, loading }) => {
  const videoPlayer = useRef(null);

  installVideoPlayer(videoPlayer, videoLink);

  if (loading) {
    return <li className="card-skeleton"></li>;
  }

  return (
    <li className="card">
      <div className="card-media-area">
        <video
          muted
          onMouseOver={() => {
            if (isNaN(videoPlayer.current.duration)) return;
            videoPlayer.current.play();
          }}
          onMouseOut={() => {
            if (isNaN(videoPlayer.current.duration)) return;
            videoPlayer.current.pause();
            videoPlayer.current.currentTime = 0;
            installVideoPlayer(videoPlayer, videoLink);
          }}
          poster={img}
          ref={videoPlayer}
        ></video>
      </div>
      <div className="card-info-area">
        <div className="card-info-top">
          <p className="lessons">Занять: {lessonsCount}</p>
          <p className="rating">
            <Rating name="half-rating-read" defaultValue={rating} readOnly size="large" />
            {rating}/5.0
          </p>
        </div>

        <h3 className="card-info-title">{title}</h3>

        <p className="card-info-description">{description}</p>

        {skills.length ? (
          <div className="card-info-skills">
            <h4>Skills:</h4>
            <ul>
              {skills.map((sk, i) => (
                <li key={i}>{sk}</li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="card-action-bottom">
        <NavLink className="card-action-link" to={`/${id}`}>
          Join
        </NavLink>
      </div>
    </li>
  );
};

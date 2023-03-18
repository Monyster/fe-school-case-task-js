import { useCallback, useEffect, useRef, useState } from "react";

import "./styles/style.css";

import { wiseyApi } from "../../utils/wiseyFetchApi";
import { NavLink, useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import ScrollToTop from "../../Components/Utils/scrollToTop";
import { getFormattedDate } from "../../utils/getFormattedData";
import { installVideoPlayer } from "../../utils/installVideoPlayer";

export const Course = () => {
  const { id } = useParams();

  // Contain all about course
  const [course, setCourse] = useState({});

  // Contain current video
  const [videoLink, setVideoLink] = useState(null);
  const [videoName, setVideoName] = useState(null);
  const [videoPoster, setVideoPoster] = useState(null);

  // Using for loading skeleton while fetching data
  const [loading, setLoading] = useState(true);

  const videoPlayer = useRef(null);

  const keyPress = useCallback((event) => {
    event.preventDefault();
    console.log(event.key);
    if (event.altKey === true) {
      switch (event.key) {
        case "1":
          if (videoPlayer.current.playbackRate === 16) break;
          videoPlayer.current.playbackRate += 0.5;
          break;
        case "2":
          if (videoPlayer.current.playbackRate === 0) break;
          videoPlayer.current.playbackRate -= 0.5;
          break;
        case "3":
          videoPlayer.current.playbackRate = 1;
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    wiseyApi(`/core/preview-courses/${id}`).then((data) => {
      setLoading(true);
      setCourse(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <>
        <ScrollToTop></ScrollToTop>
        <main className="section">
          <div className="container">
            <section className="course">
              <div className="course-go-home">
                <div className="course-go-home-button-skeleton skeleton"></div>
              </div>

              <div className="course-preview-title-skeleton skeleton"></div>

              <div className="course-preview-video-skeleton skeleton"></div>
              <div className="course-preview-detail">
                <div className="course-preview-detail-header-skeleton skeleton"></div>

                <div className="course-preview-detail-title-skeleton skeleton"></div>
                <div className="course-preview-detail-text-skeleton skeleton"></div>
                <div className="course-preview-detail-text-skeleton skeleton"></div>
                <div className="course-preview-detail-text-skeleton skeleton"></div>

                <div className="course-preview-detail-title-skeleton skeleton"></div>
                <div className="course-preview-detail-text-skeleton skeleton"></div>
                <div className="course-preview-detail-text-skeleton skeleton"></div>
                <div className="course-preview-detail-text-skeleton skeleton"></div>

                <div className="course-preview-detail-footer-skeleton skeleton"></div>
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }

  if (course.meta.courseVideoPreview !== undefined && (!videoLink || !videoPoster)) {
    setVideoLink(course.meta.courseVideoPreview.link);
    setVideoPoster(course.previewImageLink + "/cover.webp");
    setVideoName("");
    return;
  }

  if (videoLink) {
    installVideoPlayer(videoPlayer, videoLink);
  }

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <main className="section">
        <div className="container">
          <section className="course">
            <div className="course-go-home">
              <NavLink className="course-go-home-button" to={`/`}>
                Go home
              </NavLink>
            </div>

            <div className="course-preview-title">{course.title}</div>

            <div className="course-preview-media">
              <h3 className="course-preview-video-title">{videoName}</h3>

              <button
                className="course-preview-video-pip-button"
                onClick={() => {
                  videoPlayer.current.requestPictureInPicture();
                }}
              ></button>

              <video controls poster={videoPoster} ref={videoPlayer}>
                Not support player
              </video>
            </div>
            <div className="course-preview-detail">
              <div className="course-preview-detail-header">
                <div className="course-preview-detail-launch">
                  Date: <span>{getFormattedDate(course.launchDate)}</span>
                </div>
                <div className="course-preview-detail-header-rating">
                  <div>
                    <Rating name="half-rating-read" defaultValue={course.rating} readOnly size="large" />
                  </div>
                  <span>{course.rating}/5.0</span>
                </div>
              </div>

              <div className="course-preview-detail-description">
                <h5 className="course-preview-detail-description-title">Description:</h5>
                <div className="course-preview-detail-description-text">{course.description}</div>
              </div>

              {course.meta.skills?.length ? (
                <div className="course-preview-detail-skills">
                  <h5 className="course-preview-detail-skills-title">Skills:</h5>
                  <ul className="course-preview-detail-skills-list">
                    {course.meta.skills.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}

              <div className="course-preview-detail-footer">
                <div className="course-preview-detail-footer-duration">
                  Video: <span>{Math.ceil(course.duration / 60)} min total</span>
                </div>
                <div className="course-preview-detail-footer-lessons">
                  Lessons: <span>{course.lessons.length} courses</span>
                </div>
              </div>
            </div>
            <div className="course-lessons">
              <h3 className="course-lessons-title">Lessons list</h3>
              <ul className="course-lessons-list">
                {course.lessons.map((lesson, i) => (
                  <li
                    className={"lesson " + "lesson-status-" + lesson.status}
                    key={i}
                    onClick={(event) => {
                      setVideoLink(lesson.link);
                      setVideoPoster(lesson.previewImageLink + ".webp");
                      setVideoName(`${i + 1}. ${lesson.title}`);
                      videoPlayer.current.scrollIntoView();
                    }}
                  >
                    <div className="lesson-title">
                      {i + 1}. {lesson.title}
                    </div>
                    <div className="lesson-time">{Math.ceil(lesson.duration / 60)} min</div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

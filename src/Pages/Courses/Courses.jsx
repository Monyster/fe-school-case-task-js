import { useEffect, useRef, useState } from "react";

import "./styles/style.css";
import { CourseCard } from "../../Components/CourseCard/CourseCard";

import Pagination from "@mui/material/Pagination";
import { wiseyApi } from "../../utils/wiseyFetchApi";
import ScrollToTop from "../../Components/Utils/scrollToTop";

export const Courses = () => {
  // Ref to start of courses (using for scrolling up when changing pages)
  const startCoursesRef = useRef(null);

  // Contain all courses
  const [courses, setCourses] = useState([]);

  // Using for loading skeleton while fetching data
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  // Max count of courses on page
  const perPage = 10;

  // Calc the amount of all pages
  const pages = Math.ceil(courses.length / perPage);

  //  Getting the index of first course in array
  const firstCourseIndex = currentPage * perPage - perPage;

  // Slice the courses for current page
  const coursesOnPage = courses.slice(firstCourseIndex, firstCourseIndex + perPage);

  useEffect(() => {
    wiseyApi("/core/preview-courses").then((data) => {
      setLoading(true);
      setCourses(data.courses);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <main className="section">
        <div className="container">
          <h2 className="title-1">Increase your knowledge</h2>
          <h3 className="subTitle-1">Sign up for a course and learn the skills that will help you achieve your goals.</h3>
          <ul className="courses" ref={startCoursesRef}>
            {loading
              ? [...Array(perPage)].map((val, i) => <CourseCard key={i} loading={loading}></CourseCard>)
              : coursesOnPage.map((c, i) => (
                  <CourseCard
                    key={i}
                    loading={loading}
                    course={c}
                    title={c.title}
                    img={`${c.previewImageLink}/cover.webp`}
                    videoLink={c.meta.courseVideoPreview.link}
                    id={c.id}
                    description={c.description}
                    lessonsCount={c.lessonsCount}
                    skills={c.meta?.skills}
                    rating={c.rating}
                  ></CourseCard>
                ))}
          </ul>

          <Pagination
            className="pagination"
            count={pages}
            page={currentPage}
            color="primary"
            onChange={(event, page) => {
              setCurrentPage(page);

              startCoursesRef.current.scrollIntoView();
            }}
          />
        </div>
      </main>
    </>
  );
};

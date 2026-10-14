
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, BookOpen, CheckCircle2, Clock3,
  GraduationCap, PlayCircle, Star, Users
} from "lucide-react";
import { courses } from "../data/courses";
import { useApp } from "../context/AppContext";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    currentUser, enroll, isEnrolled,
    completeLesson, getCompletedLessons
  } = useApp();

  const course = courses.find(item => item.id === Number(id));

  if (!course) {
    return (
      <div className="empty-state page-empty">
        <h2>Course not found</h2>
        <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const completed = getCompletedLessons(course.id);
  const progress = Math.round(
    (completed.length / course.lessons.length) * 100
  );

  const handleEnroll = () => {
    if (!currentUser) {
      navigate("/login", {
        state: { from: `/courses/${course.id}` }
      });
      return;
    }

    enroll(course.id);
  };

  return (
    <section className="details-page">
      <div className="details-container">
        <Link to="/courses" className="back-link">
          <ArrowLeft size={17} /> Back to Courses
        </Link>

        <div className="details-layout">
          <main className="details-main">
            <span className="course-category inline-category">
              {course.category}
            </span>
            <h1>{course.title}</h1>
            <p className="details-description">{course.description}</p>

            <div className="details-meta">
              <span><Star size={17} fill="#f6b93b" color="#f6b93b" /> {course.rating} rating</span>
              <span><Users size={17} /> {course.students.toLocaleString()} students</span>
              <span><Clock3 size={17} /> {course.duration}</span>
            </div>

            <p className="instructor-line">
              Instructor: <strong>{course.instructor}</strong>
            </p>

            <div className="curriculum-card">
              <h2>Course Curriculum</h2>
              <p>{course.lessons.length} lessons · {course.level}</p>

              {course.lessons.map((lesson, index) => {
                const isComplete = completed.includes(index);

                return (
                  <div className="lesson-row" key={lesson}>
                    <div className="lesson-number">
                      {isComplete
                        ? <CheckCircle2 size={21} color="#16a36a" />
                        : <PlayCircle size={21} />}
                    </div>
                    <div className="lesson-text">
                      <strong>{lesson}</strong>
                      <span>Lesson {index + 1}</span>
                    </div>

                    {enrolled && (
                      <button
                        className={`lesson-action ${isComplete ? "lesson-done" : ""}`}
                        disabled={isComplete}
                        onClick={() => completeLesson(course.id, index)}
                      >
                        {isComplete ? "Completed" : "Complete"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </main>

          <aside className="details-sidebar">
            <img src={course.image} alt={course.title} />
            <div className="details-sidebar-body">
              <span className="price-label">Course price</span>
              <div className="details-price">₹{course.price}</div>

              <div className="course-includes">
                <p><BookOpen size={17} /> {course.lessons.length} lessons</p>
                <p><Clock3 size={17} /> {course.duration} of content</p>
                <p><GraduationCap size={17} /> {course.level} level</p>
              </div>

              {!enrolled ? (
                <button className="btn btn-primary btn-full" onClick={handleEnroll}>
                  Enroll Now
                </button>
              ) : (
                <>
                  <div className="progress-header">
                    <span>Your Progress</span><strong>{progress}%</strong>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <Link to="/my-learning" className="btn btn-primary btn-full">
                    Go to My Learning
                  </Link>
                </>
              )}

              <p className="enroll-note">
                {enrolled
                  ? "You're enrolled! Complete lessons to track your progress."
                  : "Enroll to unlock lesson tracking and save your progress."}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

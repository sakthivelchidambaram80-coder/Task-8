
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, GraduationCap } from "lucide-react";
import { courses } from "../data/courses";
import { useApp } from "../context/AppContext";

export default function MyLearning() {
  const { currentUser, myCourseIds, getProgress } = useApp();

  if (!currentUser) {
    return (
      <section className="empty-state page-empty">
        <div className="benefit-icon"><GraduationCap size={30} /></div>
        <h2>Sign in to view your learning</h2>
        <p>Log in to see your enrolled courses and saved progress.</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </section>
    );
  }

  const myCourses = courses.filter(course => myCourseIds.includes(course.id));

  const completedCourses = myCourses.filter(
    course => getProgress(course.id) === course.lessons.length
  ).length;

  return (
    <section className="learning-page">
      <div className="page-banner">
        <span className="eyebrow">YOUR PERSONAL DASHBOARD</span>
        <h1>My Learning</h1>
        <p>Welcome back, {currentUser.name}! Keep up your learning streak.</p>
      </div>

      <div className="learning-container">
        <div className="learning-stats">
          <div className="learning-stat">
            <span className="stat-icon"><BookOpen /></span>
            <div><strong>{myCourses.length}</strong><span>Enrolled Courses</span></div>
          </div>
          <div className="learning-stat">
            <span className="stat-icon green"><CheckCircle2 /></span>
            <div><strong>{completedCourses}</strong><span>Completed Courses</span></div>
          </div>
        </div>

        <div className="results-heading">
          <h2>My Courses</h2>
          <Link to="/courses" className="text-link">Explore More →</Link>
        </div>

        {myCourses.length ? (
          <div className="learning-course-list">
            {myCourses.map(course => {
              const completed = getProgress(course.id);
              const percent = Math.round(
                (completed / course.lessons.length) * 100
              );

              return (
                <article className="learning-course" key={course.id}>
                  <img src={course.image} alt={course.title} />

                  <div className="learning-course-info">
                    <span className="eyebrow">{course.category}</span>
                    <h3>{course.title}</h3>
                    <p>Instructor: {course.instructor}</p>

                    <div className="progress-header">
                      <span>{completed} of {course.lessons.length} lessons completed</span>
                      <strong>{percent}%</strong>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${percent}%` }} />
                    </div>

                    <Link to={`/courses/${course.id}`} className="btn btn-primary btn-small">
                      {percent === 100 ? "Review Course" : "Continue Learning"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <GraduationCap size={42} />
            <h3>Your learning journey starts here</h3>
            <p>You haven't enrolled in any courses yet.</p>
            <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
          </div>
        )}
      </div>
    </section>
  );
}

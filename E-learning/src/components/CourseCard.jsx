
import { Link } from "react-router-dom";
import { Clock3, Star, Users } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <Link to={`/courses/${course.id}`} className="course-image-link">
        <img
          className="course-image"
          src={course.image}
          alt={course.title}
          loading="lazy"
        />
        <span className="course-category">{course.category}</span>
      </Link>

      <div className="course-card-body">
        <div className="course-meta">
          <span><Star size={15} fill="#f6b93b" color="#f6b93b" /> {course.rating}</span>
          <span><Users size={15} /> {course.students.toLocaleString()}</span>
        </div>

        <h3>
          <Link to={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        <p className="course-instructor">By {course.instructor}</p>

        <div className="course-card-footer">
          <span className="course-duration">
            <Clock3 size={15} /> {course.duration}
          </span>
          <strong>₹{course.price}</strong>
        </div>

        <Link to={`/courses/${course.id}`} className="card-link">
          View Course →
        </Link>
      </div>
    </article>
  );
}

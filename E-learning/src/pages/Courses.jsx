
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { courses, categories } from "../data/courses";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || course.category === category;

      const matchesLevel =
        level === "All" || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  return (
    <section className="catalog-page">
      <div className="page-banner">
        <span className="eyebrow">YOUR LEARNING JOURNEY</span>
        <h1>Explore Our Courses</h1>
        <p>Find the right course and start building new skills today.</p>
      </div>

      <div className="catalog-container">
        <div className="catalog-toolbar">
          <div className="search-box">
            <Search size={20} />
            <input
              type="search"
              placeholder="Search courses, skills, instructors..."
              value={search}
              onChange={event => setSearch(event.target.value)}
              aria-label="Search courses"
            />
          </div>

          <label className="level-filter">
            <SlidersHorizontal size={17} />
            <select value={level} onChange={event => setLevel(event.target.value)}>
              <option value="All">All levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </label>
        </div>

        <div className="category-list">
          {categories.map(item => (
            <button
              key={item}
              className={`category-button ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="results-heading">
          <h2>Available Courses</h2>
          <span>{filteredCourses.length} courses found</span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="course-grid">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={38} />
            <h3>No courses found</h3>
            <p>Try another search term or select a different category.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setLevel("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

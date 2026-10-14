
import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, GraduationCap,
  PlayCircle, Trophy, Users
} from "lucide-react";
import { courses } from "../data/courses";
import CourseCard from "../components/CourseCard";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="eyebrow">
              <GraduationCap size={17} /> YOUR FUTURE STARTS HERE
            </span>
            <h1>Learn New Skills.<br />Build Your <span>Future.</span></h1>
            <p>
              Discover practical courses taught by expert instructors.
              Learn at your own pace and turn your goals into achievements.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary">
                Explore Courses <ArrowRight size={18} />
              </Link>
              <Link to="/registration" className="btn btn-outline">
                Join for Free
              </Link>
            </div>

            <div className="hero-stats">
              <div><strong>6+</strong><span>Courses</span></div>
              <div><strong>7K+</strong><span>Students</span></div>
              <div><strong>4.8/5</strong><span>Average Rating</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85"
              alt="Student learning online with a laptop"
            />
            <div className="floating-card floating-top">
              <span className="floating-icon"><PlayCircle size={23} /></span>
              <div><strong>Learn Anywhere</strong><small>Your own schedule</small></div>
            </div>
            <div className="floating-card floating-bottom">
              <span className="floating-icon green"><Trophy size={23} /></span>
              <div><strong>Keep Growing</strong><small>Track your progress</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LEARN SOMETHING NEW</span>
            <h2>Explore Popular Courses</h2>
            <p>Start learning the skills that matter to you.</p>
          </div>
          <Link to="/courses" className="text-link">
            View All Courses <ArrowRight size={17} />
          </Link>
        </div>

        <div className="course-grid">
          {courses.slice(0, 3).map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-heading centered">
          <div>
            <span className="eyebrow">WHY LEARNHUB?</span>
            <h2>Learning Made Simple</h2>
            <p>Everything you need to make progress on your goals.</p>
          </div>
        </div>

        <div className="benefits-grid">
          <article className="benefit-card">
            <div className="benefit-icon"><BookOpen /></div>
            <h3>Expert-Led Courses</h3>
            <p>Explore practical lessons created by experienced instructors.</p>
          </article>
          <article className="benefit-card">
            <div className="benefit-icon"><Users /></div>
            <h3>Learn at Your Pace</h3>
            <p>Study when it suits you and revisit lessons whenever needed.</p>
          </article>
          <article className="benefit-card">
            <div className="benefit-icon"><Trophy /></div>
            <h3>Track Your Progress</h3>
            <p>Keep track of completed lessons and celebrate every milestone.</p>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <span className="eyebrow">TAKE THE NEXT STEP</span>
          <h2>Your next skill is just a course away.</h2>
          <p>Discover a course, start learning, and track your journey.</p>
        </div>
        <Link to="/courses" className="btn btn-light">
          Start Learning <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}

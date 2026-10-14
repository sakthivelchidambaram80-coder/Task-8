
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyLearning from "./pages/MyLearning";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

import "./index.css";

function NotFound() {
  return (
    <section className="empty-state page-empty">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a className="btn btn-primary" href="/">Go Home</a>
    </section>
  );
}

function AppLayout() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}

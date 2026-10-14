
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AppContext = createContext();

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() =>
    readStorage("learnhub_users", [])
  );

  const [currentUser, setCurrentUser] = useState(() =>
    readStorage("learnhub_current_user", null)
  );

  const [learning, setLearning] = useState(() =>
    readStorage("learnhub_learning", {})
  );

  useEffect(() => {
    localStorage.setItem("learnhub_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(
      "learnhub_current_user",
      JSON.stringify(currentUser)
    );
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("learnhub_learning", JSON.stringify(learning));
  }, [learning]);

  const register = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some(user => user.email === normalizedEmail)) {
      return { success: false, message: "Email already registered." };
    }

    const user = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password
    };

    setUsers(previous => [...previous, user]);
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email
    });

    return { success: true };
  };

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
      item =>
        item.email === normalizedEmail &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password."
      };
    }

    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email
    });

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const enroll = courseId => {
    if (!currentUser) {
      return { success: false, message: "Please log in to enroll." };
    }

    const email = currentUser.email;
    const existing = learning[email] || {};

    if (existing[courseId]) {
      return { success: true, message: "Already enrolled." };
    }

    setLearning(previous => ({
      ...previous,
      [email]: {
        ...(previous[email] || {}),
        [courseId]: []
      }
    }));

    return { success: true, message: "Enrollment successful!" };
  };

  const completeLesson = (courseId, lessonIndex) => {
    if (!currentUser) return;

    const email = currentUser.email;

    setLearning(previous => {
      const userCourses = previous[email] || {};
      const completed = userCourses[courseId] || [];

      if (completed.includes(lessonIndex)) return previous;

      return {
        ...previous,
        [email]: {
          ...userCourses,
          [courseId]: [...completed, lessonIndex]
        }
      };
    });
  };

  const isEnrolled = courseId => {
    if (!currentUser) return false;

    return Object.prototype.hasOwnProperty.call(
      learning[currentUser.email] || {},
      courseId
    );
  };

  const getProgress = courseId => {
    if (!currentUser) return 0;

    const completed =
      learning[currentUser.email]?.[courseId] || [];

    return completed.length;
  };

  const getCompletedLessons = courseId => {
    if (!currentUser) return [];

    return learning[currentUser.email]?.[courseId] || [];
  };

  const myCourseIds = currentUser
    ? Object.keys(learning[currentUser.email] || {}).map(Number)
    : [];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        enroll,
        isEnrolled,
        completeLesson,
        getProgress,
        getCompletedLessons,
        myCourseIds
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

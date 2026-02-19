import styles from "./Logout.module.css";
import axiosInstance from "../../api/axios.js";
import { setUser, closeDashBoard } from "../../store/auth-slice";
import { closeLogoutTab, setActiveNav } from "../../store/UI-slice.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Error from "../../UI/Error/Error.jsx";

export default function Logout({ onLogoutClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      setIsLoading(true);
      setError("");
      const response = await axiosInstance.post(
        "http://localhost:5193/api/auth/logout",
      );

      dispatch(setUser({}));
      dispatch(closeDashBoard());
      dispatch(closeLogoutTab());
      dispatch(setActiveNav({ activeNav: "message" }));
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.msg || "Failed to logout user.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.logoutContainer}>
      <h3 className={styles.logoutText}>Are you sure you want to logout ?</h3>
      <div className={styles.buttonController}>
        <button
          disabled={isLoading}
          className={styles.closeButton}
          onClick={onLogoutClose}
        >
          Close
        </button>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className={styles.logoutButton}
        >
          {isLoading ? "LoggingOut..." : "Logout"}
        </button>
      </div>
    </section>
  );
}

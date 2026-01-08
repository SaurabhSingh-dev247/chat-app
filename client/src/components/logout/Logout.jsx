import styles from "./Logout.module.css";

export default function Logout({ onLogoutClose }) {
  return (
    <section className={styles.logoutContainer}>
      <h3 className={styles.logoutText}>Do you really want to logout ?</h3>
      <div className={styles.buttonController}>
        <button className={styles.closeButton} onClick={onLogoutClose}>
          Close
        </button>
        <button className={styles.logoutButton}>Logout</button>
      </div>
    </section>
  );
}

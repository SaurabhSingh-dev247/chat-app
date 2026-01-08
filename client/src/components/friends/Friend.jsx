import styles from "./Friend.module.css";
import profile from "../../assets/profile-1.jpg";

export default function FriendCard() {
  return (
    <li className={styles["friend-card"]}>
      <div className={styles["user-profile"]}>
        <img src={profile} />
      </div>
      <div className={styles["user-info"]}>
        <div className={styles["user-id"]}>
          <span className={styles["user-name"]}>Saurabh Singh</span>
          <span className={styles["user-last-message"]}>Hii!</span>
        </div>
        <div className={styles["user-last-active-displayer"]}>
          <span className={styles["last-active-time"]}>09:30am</span>
          <span className={styles["user-messages-count"]}>4</span>
        </div>
      </div>
    </li>
  );
}

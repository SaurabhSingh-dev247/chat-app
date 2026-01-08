import styles from "./ChatWindow.module.css";
import userFriend from "../../../assets/profile-2.jpg";

export default function ChatWindowHeader({ onSelect }) {
  return (
    <div className={styles["active-friend-header"]}>
      <div
        className={styles["active-friend-profile"]}
        role="button"
        onClick={onSelect}
      >
        <img src={userFriend} alt="Friend profile" />
      </div>
      <div className={styles["active-friend-id"]}>
        <h2 className={styles["active-friend-name"]}>Praveen Maurya</h2>
        <p className={styles["active-friend-status"]}>Praveen is typing...</p>
      </div>
    </div>
  );
}

import styles from "./ChatWindow.module.css";
import userFriend from "../../../assets/profile-2.jpg";
import getDate from "../../../util/date.js";
import { isToday } from "../../../util/checkToday.js";
import getCurrentTime from "../../../util/time.js";
import { useSelector } from "react-redux";

export default function ChatWindowHeader({ onSelect }) {
  const selectedFriend = useSelector((state) => state.auth.selectedFriend);
  let friendState;

  if (Object.keys(selectedFriend).length > 0) {
    const friendActiveDate = getDate(selectedFriend?.lastSeen);
    const friendActiveTime = getCurrentTime(selectedFriend?.lastSeen);

    if (
      selectedFriend?.status === "active" ||
      selectedFriend?.status === "online"
    ) {
      friendState = "active right now";
    } else if (
      selectedFriend?.status === "offline" ||
      selectedFriend?.status === "away" ||
      selectedFriend?.status === "inactive"
    ) {
      friendState = `last seen at ${isToday(selectedFriend?.lastSeen) ? "today at" : friendActiveDate} ${friendActiveTime}`;
    }
  }

  if (Object.keys(selectedFriend).length > 0) {
    return (
      <div className={styles["active-friend-header"]}>
        <div
          className={styles["active-friend-profile"]}
          role="button"
          onClick={onSelect}
        >
          <img
            src={`http://localhost:5193/${selectedFriend.avatar}`}
            alt="Friend profile"
          />
        </div>
        <div className={styles["active-friend-id"]}>
          <h2 className={styles["active-friend-name"]}>
            {selectedFriend.name}
          </h2>
          {friendState && (
            <p
              className={`${
                selectedFriend?.status === "active" ||
                selectedFriend?.status === "online"
                  ? styles["active-friend-status"]
                  : styles["inactive-friend-status"]
              }`}
            >
              {friendState}
            </p>
          )}
        </div>
      </div>
    );
  }

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

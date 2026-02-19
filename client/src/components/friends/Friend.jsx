import styles from "./Friend.module.css";

export default function FriendCard({
  friendAvatar,
  friendName,
  friendLastMessage,
  friendLastActiveDate,
  friendLastActiveTime,
  friendMessagesCount,
  onImageSelect,
  onSelect,
  isSelected,
  isActiveToday,
  isActiveRightNow,
}) {
  return (
    <li
      className={`${styles["friend-card"]} ${isSelected ? styles["selected"] : ""}`}
      onClick={onSelect}
    >
      <div className={styles["user-profile"]}>
        <img src={friendAvatar} onClick={onImageSelect} />
      </div>
      <div className={styles["user-info"]}>
        <div className={styles["user-id"]}>
          <span className={styles["user-name"]}>{friendName}</span>
          <span className={styles["user-last-message"]}>
            {friendLastMessage}
          </span>
        </div>
        {isActiveRightNow && (
          <span className={`${styles["active-now"]}`}>active</span>
        )}
        {!isActiveRightNow && (
          <div className={styles["user-last-active-displayer"]}>
            <p className={styles["last-active-time"]}>
              <span
                className={`${isActiveToday ? styles["today-active"] : ""}`}
              >
                {friendLastActiveDate}
              </span>{" "}
              <span>{friendLastActiveTime}</span>
            </p>
          </div>
        )}
        {friendMessagesCount && (
          <span className={styles["user-messages-count"]}>
            {friendMessagesCount}
          </span>
        )}
      </div>
    </li>
  );
}

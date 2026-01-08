import styles from "./Messagecard.module.css";
import { Download } from "lucide-react"; // or use any download icon
import avatar from "../../../assets/profile-2.jpg";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/UI-slice";

export function UserMessageCard({ message, timestamp, media }) {
  const dispatch = useDispatch();

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = media;
    link.download = `media-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <li className={styles["message-item"]}>
      <div
        className={`${styles["message-bubble"]} ${styles["message-bubble-user"]}`}
      >
        {media && (
          <div
            className={styles["message-media"]}
            onClick={(e) => dispatch(openModal({ image: e.target.src }))}
          >
            <img src={avatar} alt="Shared media" />
            <button
              className={styles["download-btn"]}
              onClick={handleDownload}
              aria-label="Download media"
            >
              <Download size={20} />
            </button>
          </div>
        )}
        {message && <p className={styles["message-text"]}>{message}</p>}
        {timestamp && (
          <span className={styles["message-time"]}>{timestamp}</span>
        )}
      </div>
    </li>
  );
}

export function UserFriendMessageCard({
  message,
  timestamp,
  userName = "Friend",
  userAvatar,
  media,
}) {
  const dispatch = useDispatch();

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = media;
    link.download = `media-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <li className={styles["message-item-friend"]}>
      <div className={styles["friend-message"]}>
        <div className={styles["message-avatar"]}>
          <img src={avatar} alt={`${userName}'s avatar`} />
        </div>
        <div className={styles["message-content"]}>
          <div
            className={`${styles["message-bubble"]} ${styles["message-bubble-friend"]}`}
          >
            {media && (
              <div
                className={styles["message-media"]}
                onClick={(e) => dispatch(openModal({ image: e.target.src }))}
              >
                <img src={media} alt="Shared media" />
                <button
                  className={styles["download-btn"]}
                  onClick={handleDownload}
                  aria-label="Download media"
                >
                  <Download size={20} />
                </button>
              </div>
            )}
            {message && <p className={styles["message-text"]}>{message}</p>}
            {timestamp && (
              <span className={styles["message-time"]}>{timestamp}</span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

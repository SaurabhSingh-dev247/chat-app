import styles from "./ChatList.module.css";
import locationIcon from "../../../assets/location_6172689.png";
import PinnedMessagesIcon from "../../../UI/Icons/PinnedMessagesIcon.jsx";
import AllMessagesIcon from "../../../UI/Icons/AllMessagesIcon.jsx";
import messageIcon from "../../../assets/mail_5804503.png";
import FriendCard from "../../friends/Friend.jsx";
import Modal from "../../../UI/dialog/Modal.jsx";
import { openModal } from "../../../store/UI-slice.js";
import { useDispatch, useSelector } from "react-redux";

const USER_FRIENDS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
];

const PINNED_FRIENDS = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function ChatList() {
  const openedImage = useSelector((state) => state.ui.openedImageSrc);
  const modalOpen = useSelector((state) => state.ui.modalOpen);
  const dispatch = useDispatch();

  function handleImageSelect(image) {
    dispatch(openModal({ image }));
  }

  return (
    <>
      <Modal open={modalOpen}>{openedImage && <img src={openedImage} />}</Modal>
      <aside className={styles["chat-lists"]}>
        <div className={styles.header}>
          <h1>Messages</h1>
        </div>
        <div className={styles["search-bar-wrapper"]}>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>

        <div className={styles["pinned-messages-wrapper"]}>
          <div className={styles["pinned-illustration"]}>
            <PinnedMessagesIcon />
            <span className={styles["pinned-messages-text"]}>
              Pinned messages
            </span>
          </div>
          <ul className={styles["user-friends"]}>
            {PINNED_FRIENDS.map((user) => (
              <FriendCard
                key={user.id}
                onImageSelect={(e) => handleImageSelect(e.target.src)}
              />
            ))}
          </ul>
        </div>
        <div className={styles["all-messages"]}>
          <div className={styles["all-message-illustration"]}>
            <AllMessagesIcon />
            <span className={styles["all-messages-text"]}>All messages</span>
          </div>
          <ul className={styles["user-friends"]}>
            {USER_FRIENDS.map((user) => (
              <FriendCard
                key={user.id}
                onImageSelect={(e) => handleImageSelect(e.target.src)}
              />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

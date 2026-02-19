import PinnedMessagesIcon from "../../../UI/Icons/PinnedMessagesIcon.jsx";
import styles from "./ChatList.module.css";
import FriendCard from "../../friends/Friend.jsx";
import getDate from "../../../util/date.js";
import getCurrentTime from "../../../util/time.js";
import { setSelectedFriend } from "../../../store/auth-slice.js";
import { openModal } from "../../../store/UI-slice.js";
import { useDispatch, useSelector } from "react-redux";

export default function PinnedMessage({ pinnedFriends }) {
  const dispatch = useDispatch();
  const selectedFriend = useSelector((state) => state.auth.selectedFriend);

  function handleImageSelect(image) {
    dispatch(openModal({ image }));
  }

  return (
    <div className={styles["pinned-messages-wrapper"]}>
      <div className={styles["pinned-illustration"]}>
        <PinnedMessagesIcon />
        <span className={styles["pinned-messages-text"]}>Pinned messages</span>
      </div>
      <ul className={styles["user-friends"]}>
        {pinnedFriends.length > 0 &&
          pinnedFriends.map((pinnedfriend, idx) => {
            if (!Object.hasOwn(pinnedfriend, "friend")) {
              return <></>;
            }
            const lastActiveDate = getDate(pinnedfriend.friend.lastSeen);
            const lastActiveTime = getCurrentTime(pinnedfriend.friend.lastSeen);

            return (
              <FriendCard
                onSelect={() =>
                  dispatch(setSelectedFriend(pinnedfriend.friend))
                }
                isSelected={pinnedfriend.friend._id.includes(
                  selectedFriend?._id,
                )}
                onImageSelect={(e) => handleImageSelect(e.target.src)}
                key={pinnedfriend.friend._id}
                friendName={pinnedfriend.friend.name}
                friendAvatar={`http://localhost:5193/${pinnedfriend.friend.avatar}`}
                friendLastActiveDate={
                  lastActiveDate === new Date().toLocaleDateString()
                    ? "Today"
                    : lastActiveDate
                }
                friendLastActiveTime={lastActiveTime}
                // friendMessagesCount={6}
              />
            );
          })}
      </ul>
    </div>
  );
}

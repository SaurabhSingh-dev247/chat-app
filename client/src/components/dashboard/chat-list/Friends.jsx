import AllMessagesIcon from "../../../UI/Icons/AllMessagesIcon.jsx";
import styles from "./ChatList.module.css";
import FriendCard from "../../friends/Friend.jsx";
import { openModal } from "../../../store/UI-slice.js";
import {
  setSelectedFriend,
  addMessages,
  setMessagesLoading,
  setMessagesLoadingError,
  setConversationId,
} from "../../../store/auth-slice.js";
import { useDispatch, useSelector } from "react-redux";
import getDate from "../../../util/date.js";
import getCurrentTime from "../../../util/time.js";
import axios from "axios";
import { isToday } from "../../../util/checkToday.js";

export default function Friends({ allFriends }) {
  const dispatch = useDispatch();
  const selectedFriend = useSelector((state) => state.auth.selectedFriend);
  const userData = useSelector((state) => state.auth.userData);
  //const { data, loading, error}= useSelector(state => state.auth.messages);

  function handleImageSelect(image) {
    dispatch(openModal({ image }));
  }

  function handleFriendSelect(friend) {
    dispatch(setSelectedFriend(friend));
  }

  async function startConversation(friend) {
    try {
      setMessagesLoading(true);
      setMessagesLoadingError("");
      const response = await axios.post(
        `http://localhost:5193/api/fetch/user-messages?limit=${10}&page=${0}`,
        {
          friendId: friend.friend._id,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        },
      );
      const reversed = [...response.data.messages].toReversed()
      dispatch(addMessages({ message: reversed }));
      dispatch(setSelectedFriend(friend.friend));
      dispatch(setConversationId(response.data?.conversationId));
    } catch (error) {
      console.log(error);
      setMessagesLoadingError(
        error?.response?.data?.msg || "Failed to fetch messages",
      );
    } finally {
      setMessagesLoading(false);
    }
  }

  return (
    <div className={styles["all-messages"]}>
      <div className={styles["all-message-illustration"]}>
        <AllMessagesIcon />
        <span className={styles["all-messages-text"]}>All messages</span>
      </div>
      <ul className={styles["user-friends"]}>
        {allFriends.length > 0 &&
          allFriends.map((friend) => {
            if (!Object.hasOwn(friend, "friend")) {
              return <></>;
            }

            const lastActiveDate = getDate(friend.friend.lastSeen);
            const lastActiveTime = getCurrentTime(friend.friend.lastSeen);
           
            return (
              <FriendCard
                onSelect={() => startConversation(friend)}
                isSelected={friend.friend._id.includes(selectedFriend?._id)}
                onImageSelect={(e) => handleImageSelect(e.target.src)}
                key={friend.friend._id}
                friendName={friend.friend.name}
                friendAvatar={`http://localhost:5193/${friend.friend.avatar}`}
                friendLastActiveDate={
                  isToday(friend.friend.lastSeen) ? "today at" : lastActiveDate
                }
                friendLastMessage={friend.lastMessage}
                friendLastActiveTime={lastActiveTime}
                isActiveToday={isToday(friend.friend.lastSeen)}
                isActiveRightNow={
                  friend.friend.status === "active" ||
                  friend.friend.status === "online"
                }
              />
            );
          })}
      </ul>
    </div>
  );
}

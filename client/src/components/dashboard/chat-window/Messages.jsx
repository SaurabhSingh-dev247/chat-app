import { UserFriendMessageCard, UserMessageCard } from "./MessageCard.jsx";
import getCurrentTime from "../../../util/time.js";
import { isToday } from "../../../util/checkToday.js";
import getDate from "../../../util/date.js";
import { useSelector } from "react-redux";

export default function Messages({
  messages,
  isLoading,
  userData,
}) {
  const selectedFriend = useSelector((state) => state.auth.selectedFriend);
  const { data: allMessages } = useSelector((state) => state.auth.messages);

  return (
    <>
      {messages.length > 0 &&
        !isLoading &&
        messages.map((message, index) => {
          if (Object.hasOwn(message, "updatedAt")) {
            const date = getDate(message.updatedAt);
            const today = isToday(message.updatedAt);
            const messageCreatedTime = getCurrentTime(message.updatedAt);

            if (userData.user.userId === message.sender) {
              return (
                <UserMessageCard
                  key={index}
                  message={message.text}
                  timestamp={messageCreatedTime}
                  date={today ? "today at" : date}
                />
              );
            } else {
              return (
                <UserFriendMessageCard
                  key={index}
                  message={message.text}
                  timestamp={messageCreatedTime}
                  date={today ? "today at" : date}
                  avatar={`http://localhost:5193/${selectedFriend.avatar}`}
                />
              );
            }
          }

          if (Object.hasOwn(message, "timestamp")) {
            const date = getDate(message.timestamp);
            const today = isToday(message.timestamp);
            const messageCreatedTime = getCurrentTime(message.timestamp);
            if (userData.user.userId === message.sender) {
              return (
                <UserMessageCard
                  key={index}
                  message={message.text}
                  timestamp={messageCreatedTime}
                  date={today ? "today at" : date}
                />
              );
            } else {
              return (
                <UserFriendMessageCard
                  key={index}
                  message={message.text}
                  timestamp={messageCreatedTime}
                  date={today ? "today at" : date}
                  avatar={`http://localhost:5193/${selectedFriend.avatar}`}
                />
              );
            }
          }
        })}
    </>
  );
}

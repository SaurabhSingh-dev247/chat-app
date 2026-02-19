import styles from "./ChatList.module.css";
import Modal from "../../../UI/dialog/Modal.jsx";
import axiosInstance from "../../../api/axios.js";
import getCurrentTime from "../../../util/time.js";
import Error from "../../../UI/Error/Error.jsx";
import Friends from "./Friends.jsx";
import PinnedMessage from "./PinnedMessages.jsx";
import ChatListHeader from "./ChatListHeader.jsx";
import FriendSearchInput from "./FriendsSearchInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFriends } from "../../../store/auth-slice.js";

export default function ChatList() {
  const dispatch = useDispatch();
  const openedImage = useSelector((state) => state.ui.openedImageSrc);
  const modalOpen = useSelector((state) => state.ui.modalOpen);
  const userData = useSelector((state) => state.auth.userData);
  const userFriends = useSelector((state) => state.auth.userFriends);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFriends() {
      try {
        setIsLoading(true);
        setError("");
        const response = await axiosInstance.post(
          "/fetch/user-friends",
          {},
          {
            headers: {
              Authorization: `Bearer ${userData.accessToken}`,
            },
          },
        );

        dispatch(addFriends([...response.data.friends]));
      } catch (error) {
        console.log(error);
        setError("Failed to fetch user friends.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchFriends();
  }, []);

  return (
    <>
      <Modal open={modalOpen}>{openedImage && <img src={openedImage} />}</Modal>
      <aside className={styles["chat-lists"]}>
        {error && <Error error={error} onClose={() => setError("")} />}
        {userData.user && <ChatListHeader user={userData.user} />}
        <FriendSearchInput />
        {isLoading && (
          <p
            style={{
              textAlign: "center",
              margin: "1rem",
              fontSize: "1.2rem",
              color: "gray",
            }}
          >
            Loading user friends...
          </p>
        )}
        {userFriends.length > 0 && !isLoading && (
          <Friends allFriends={userFriends} />
        )}
      </aside>
    </>
  );
}

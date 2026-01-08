import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, openModal } from "../../../store/UI-slice.js";
import styles from "./ChatWindow.module.css";
import userMessageImg from "../../../assets/friend-message.jpg";
import MicIcon from "../../../UI/Icons/MicIcons.jsx";
import TelegramIcon from "../../../UI/Icons/TelegramIcon.jsx";
import { UserFriendMessageCard, UserMessageCard } from "./MessageCard.jsx";
import Modal from "../../../UI/dialog/Modal.jsx";
import ChatWindowHeader from "./ChatwindowHeader.jsx";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);
  const modalOpen = useSelector((state) => state.ui.modalOpen);
  const openedImage = useSelector((state) => state.ui.openedImageSrc);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <Modal open={modalOpen} onClose={() => dispatch(closeModal())}>
        {openedImage && <img src={openedImage} />}
      </Modal>
      <section className={styles["chat-window"]}>
        <ChatWindowHeader
          onSelect={(e) => {
            dispatch(openModal({ image: e.target.src }));
          }}
        />
        <ol className={styles["user-chats-wrapper"]}>
          <UserMessageCard
            // message="Hello Adarsh!"
            timestamp="11:57pm"
            media={userMessageImg}
          />
          <UserFriendMessageCard
            message="Hello! "
            timestamp="12:00am"
            media={userMessageImg}
          />

          {/* Add more messages to test scrolling */}
          <UserMessageCard
            message="This is another test message"
            timestamp="12:01am"
          />

          <UserFriendMessageCard
            message="Yes, testing the scroll functionality!"
            timestamp="12:02am"
          />

          <div ref={chatEndRef} />
        </ol>

        <div className={styles["chat-input"]}>
          <div className={styles["input-wrapper"]}>
            <button aria-label="Record voice message">
              <MicIcon style={{ color: "white" }} />
            </button>
            <input type="text" placeholder="Type your messages here..." />
            <button aria-label="Send message">
              <TelegramIcon style={{ color: "white" }} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

/* <p className={styles["date-wrapper"]}>30 December 2025</p> */

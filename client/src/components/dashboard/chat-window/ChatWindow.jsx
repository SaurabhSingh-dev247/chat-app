import styles from "./ChatWindow.module.css";
import ChatWindowHeader from "./ChatwindowHeader.jsx";
import Messages from "./Messages.jsx";
import ChatInput from "./ChatInput.jsx";
import Modal from "../../../UI/dialog/Modal.jsx";
import Error from "../../../UI/Error/Error.jsx";
import { closeModal, openModal } from "../../../store/UI-slice.js";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMessages,
  setMessagesLoadingError,
  setActiveFriends,
  setSelectedFriendStatus,
  addMoreChats,
} from "../../../store/auth-slice.js";
import axios, { all } from "axios";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.ui.modalOpen);
  const openedImage = useSelector((state) => state.ui.openedImageSrc);
  const userData = useSelector((state) => state.auth.userData);
  const selectedFriend = useSelector((state) => state.auth.selectedFriend);
  const {
    data: allMessages,
    loading: messagesLoading,
    error: messagesError,
  } = useSelector((state) => state.auth.messages);
  const conversationId = useSelector((state) => state.auth.conversationId);
  const [enteredMessage, setEnteredMessage] = useState("");
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isPaginatedMessagesLoading, setPaginatedMessagesLoading] =
    useState(false);
  const [page, setPage] = useState(0);
  const [isNewMessageArrived, setIsNewMessageArrived] = useState(false);
  allMessages.length > 10 ? allMessages.length - 11 : allMessages.length - 1;

  const chatEndRef = useRef(null);
  const socketRef = useRef(null);
  const userChatsListRef = useRef(null);
  const previousScrollHeightRef = useRef(0);

  function scrollToBottom(behaviour = "smooth") {
    if (chatEndRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: behaviour });
    }
  }

  useEffect(() => {
    if (socketRef.current) return;

    socketRef.current = new WebSocket("ws://localhost:5193");

    const handleOpen = (event) => {
      console.log("Successfully connected.");
      const firstMessage = {
        type: "authenticate",
        user: {
          accessToken: userData.accessToken,
          userId: userData.user.userId,
          userName: userData.user.userName,
        },
      };
      socketRef.current.send(JSON.stringify(firstMessage));
    };

    const handleIncomingMessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("INCOMING MESSAGE: ", message);
      if (message.type === "authenticated") {
        dispatch(addMessages({ message: [] }));
        return;
      }

      if (message.type === "error") {
        setError(message.message);
        return;
      }

      if (message.type === "send_message") {
        const incomingMessage = {
          ...message,
        };
        dispatch(addMessages({ message: incomingMessage }));
        setIsNewMessageArrived(true);
        return;
      }

      if (message.type === "status_changed") {
        if (Object.keys(selectedFriend).length === 0) {
          dispatch(
            setActiveFriends({ id: message.id, status: message.status }),
          );
          return;
        } else {
          dispatch(
            setSelectedFriendStatus({ id: message.id, status: message.status }),
          );
          dispatch(
            setActiveFriends({ id: message.id, status: message.status }),
          );
          return;
        }
      }
    };

    const handleError = (event) => {
      console.log("EVENT: ", event);
      setError(
        "Socket connection closed check your internet or refresh the page.",
      );
    };

    socketRef.current.addEventListener("open", handleOpen);
    socketRef.current.addEventListener("message", handleIncomingMessage);
    socketRef.current.addEventListener("error", handleError);

    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.removeEventListener("open", handleOpen);
        socketRef.current.removeEventListener("message", handleIncomingMessage);
        socketRef.current.removeEventListener("error", handleError);
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (allMessages.length > 0 && !messagesLoading && page === 0) {
      scrollToBottom("instant");
      return;
    }
    if (isNewMessageArrived) {
      scrollToBottom();
      setIsNewMessageArrived(false);
    }
    if (page > 0 && userChatsListRef.current) {
      const newScrollHeight = userChatsListRef.current.scrollHeight;

      const heightDifference =
        newScrollHeight - previousScrollHeightRef.current;

      userChatsListRef.current.scrollTop = heightDifference;
    }
  }, [allMessages, isNewMessageArrived]);

  //useEffect(() => {}, [allMessages]);

  useEffect(() => {
    if (page > 0 && hasMore) {
      async function fetchMoreChats() {
        try {
          setError("");
          setPaginatedMessagesLoading(true);
          const response = await axios.post(
            `http://localhost:5193/api/fetch/user-messages?limit=${5}&page=${page}`,
            { friendId: selectedFriend._id },
            {
              headers: {
                Authorization: `Bearer ${userData.accessToken}`,
              },
            },
          );
          if (response.data?.messages.length === 0) {
            setHasMore(false);
          }
          const reversed = [...response.data?.messages].toReversed();
          dispatch(addMoreChats({ message: reversed }));
        } catch (error) {
          console.log("ERROR LOADING MORE MESSAGES: ", error);
          setError(
            error?.response?.data?.msg || "Failed to load more messages.",
          );
        } finally {
          setPaginatedMessagesLoading(false);
        }
      }
      fetchMoreChats();
    }
  }, [page]);

  function handleChatsScroll() {
    if (userChatsListRef.current) {
      const { scrollTop } = userChatsListRef.current;

      if (
        Math.floor(scrollTop) === 0 &&
        hasMore &&
        !isPaginatedMessagesLoading
      ) {
        previousScrollHeightRef.current = userChatsListRef.current.scrollHeight;

        setPage((prevPage) => prevPage + 1);
      }
    }
  }

  function handleMessageInput(message) {
    setEnteredMessage(message);
    setError("");
  }

  function handleMessageSendOnEnter(e) {
    if (
      e.key === "Enter" &&
      Object.keys(selectedFriend).length > 0 &&
      enteredMessage.length > 0
    ) {
      const data = {
        type: "send_message",
        sender: userData?.user?.userId,
        receiver: selectedFriend?._id,
        text: enteredMessage,
        timestamp: new Date(),
        conversationId,
      };

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(data));
        setEnteredMessage("");

        return;
      }
    } else if (e.key === "Enter" && Object.keys(selectedFriend).length === 0) {
      setError("Receiver is not selected.");
      return;
    } else if (
      e.key === "Shift" ||
      e.key === "Backspace" ||
      e.key === "Control" ||
      e.key === "CapsLock"
    ) {
      setError("");

      return;
    } else {
      setError("Press enter to send the message");
    }
  }

  function handleMessageSend(e) {
    if (Object.keys(selectedFriend).length > 0 && enteredMessage.length > 0) {
      const data = {
        type: "send_message",
        sender: userData?.user?.userId,
        receiver: selectedFriend?._id,
        text: enteredMessage,
        timestamp: new Date(),
        conversationId,
        conversationType: "direct",
      };

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(data));
        setEnteredMessage("");
        return;
      }
    } else {
      setError("Receiver is not selected.");
    }
  }

  return (
    <>
      <Modal open={modalOpen} onClose={() => dispatch(closeModal())}>
        {openedImage && <img src={openedImage} />}
      </Modal>
      <section className={styles["chat-window"]}>
        {selectedFriend && (
          <>
            <ChatWindowHeader
              onSelect={(e) => {
                dispatch(openModal({ image: e.target.src }));
              }}
            />
            <ol
              className={styles["user-chats-wrapper"]}
              onScroll={handleChatsScroll}
              ref={userChatsListRef}
            >
              {(error || messagesError) && (
                <Error
                  error={error || messagesError}
                  onClose={() => {
                    setError("");
                    setMessagesLoadingError("");
                  }}
                />
              )}
              {isPaginatedMessagesLoading && (
                <p
                  style={{
                    margin: "12px",
                    fontSize: "1.2rem",
                    textAlign: "center",
                    color: "rebeccapurple",
                  }}
                >
                  Loading more messages...
                </p>
              )}

              <Messages
                messages={allMessages}
                isLoading={messagesLoading}
                userData={userData}
              />
              <div ref={chatEndRef} />
              {messagesLoading && <p>Loading messages...</p>}
            </ol>
            <div className={styles["chat-input"]}>
              <ChatInput
                onMessageEnter={(e) => handleMessageInput(e.target.value)}
                onMessageSend={(e) => handleMessageSend(e)}
                onKeyPress={(e) => handleMessageSendOnEnter(e)}
                inputValue={enteredMessage}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}

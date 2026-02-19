import MicIcon from "../../../UI/Icons/MicIcons.jsx";
import TelegramIcon from "../../../UI/Icons/TelegramIcon.jsx";
import styles from "./ChatWindow.module.css";

export default function ChatInput({
  onMessageEnter,
  onMessageSend,
  onKeyPress,
  inputValue
}) {
  return (
    <>
      <div className={styles["input-wrapper"]}>
        <button aria-label="Record voice message">
          <MicIcon style={{ color: "white" }} />
        </button>
        <input
          type="text"
          placeholder="Type your messages here..."
          value={inputValue}
          onChange={onMessageEnter}
          onKeyDown={onKeyPress}
        />
        <button aria-label="Send message" onClick={onMessageSend}>
          <TelegramIcon style={{ color: "white" }} />
        </button>
      </div>
    </>
  );
}

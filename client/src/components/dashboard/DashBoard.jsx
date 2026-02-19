import styles from "./DashBoard.module.css";
import DashBoardNav from "./dashboard-nav/DashboardNav";
import ChatList from "./chat-list/ChatList";
import ChatWindow from "./chat-window/ChatWindow";

export default function DashBoard() {
  
  return (
    <>
      <main className={styles.dashboard}>
        <DashBoardNav />
        <ChatList />
        <ChatWindow />
      </main>
    </>
  );
}

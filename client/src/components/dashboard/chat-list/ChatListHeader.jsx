import styles from "./ChatList.module.css";

export default function ChatListHeader({ user }) {
  // className={styles["user-avatar"]} console.log("USER DATA: ", user.userAvatar);

  return (
    <div className={styles.header}>
      <div>
        <h1>Messages</h1>
      </div>
      {user.userName && <p>{user.userName}</p>} 
    </div>
  );
}

/** 
 * {user?.userAvatar && (
        <div >
          <img
            src={`http://localhost:5193/${user?.userAvatar}`}
            alt="user avatar image"
          />
        </div>)}
    <img src={`http://localhost:5193/${user?.userAvatar}`} />
)} */
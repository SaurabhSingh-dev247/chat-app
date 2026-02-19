import styles from "./ChatList.module.css";

export default function FriendSearchInput() {
  return (
    <div className={styles["search-bar-wrapper"]}>
      <input type="search" name="search" id="search" placeholder="Search..." />
    </div>
  );
}

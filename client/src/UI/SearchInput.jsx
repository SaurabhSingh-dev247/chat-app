import styles from "../components/dashboard/DashBoard.module.css";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeSearch } from "../store/UI-slice.js";
import {
  addFriends,
  setSelectedFriend,
  setConversationId,
} from "../store/auth-slice.js";
import FriendCard from "../components/friends/Friend.jsx";
import Error from "./Error/Error";

export default function SearchInput({ onClose }) {
  const [friendName, setFriendName] = useState("");
  const [data, setData] = useState({ friend: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const accessToken = userData.accessToken;

  const isFriendAvailable = Object.keys(data.friend).length > 0;

  function handleChange(friendName) {
    if (friendName === userData.user.userName) {
      setError("Do not enter your own username.");
      setFriendName(friendName);
      return;
    } else {
      setFriendName(friendName);
      setError("");
      return;
    }
  }

  async function addFriend() {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:5193/api/fetch/add-friend",
        {
          friend: data.friend,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      dispatch(setSelectedFriend({ ...response.data.friend }));
      dispatch(addFriends({ ...response.data.friend }));
      dispatch(closeSearch());
      dispatch(setConversationId(response.data?.conversationId));
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.msg || "Failed to add a friend.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFriendSearch(key) {
    if (key === "Enter" && friendName.trim() !== "") {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.post(
          "http://localhost:5193/api/fetch/user-friend",
          {
            friendName,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        setFriendName("");
        setData({ friend: { ...response.data.friend } });
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.msg || "Failed to find user friend.");
      } finally {
        setIsLoading(false);
      }
    } else if (key === "CapsLock" || key === "Control" || key === "Shift") {
      setError("");
      return;
    } else if (key === "Enter" && friendName.trim() === "") {
      setError("Enter your friend unique username.");
      return;
    } else {
      setError("Press enter to find your friend.");
      return;
    }
  }

  return (
    <div className={styles["search-container"]}>
      {error && <Error error={error} onClose={() => setError("")} />}
      <div className={styles["search-header"]}>
        <h2>Search friends </h2>
        <button className={styles["close-button"]} onClick={onClose}>
          Close
        </button>
      </div>
      <input
        className={styles["search-input"]}
        type="text"
        placeholder="Enter your friend username here..."
        value={friendName}
        onKeyDown={(e) => handleFriendSearch(e.key)}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className={styles["search-result-wrapper"]}>
        {isLoading && <p>Searching user friend...</p>}
        {!isFriendAvailable && !isLoading && <p>No results found...</p>}

        {isFriendAvailable && (
          <ul
            style={{ padding: "0", boxSizing: "border-box" }}
            onClick={() => addFriend()}
            aria-disabled={isLoading}
            className={isLoading ? styles.disabled : ""}
          >
            <FriendCard
              friendName={data.friend.name}
              friendAvatar={`http://localhost:5193/${data.friend.avatar}`}
            />
          </ul>
        )}
      </div>
    </div>
  );
}

// {
//   !response && !isFriendAvailable && <p>Search results will appear here.</p>;
// }

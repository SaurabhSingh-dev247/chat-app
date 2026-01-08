import styles from "./Settings.module.css";
import SettingIcon from "../../UI/Icons/SettingIcon.jsx";
import LogoutIcon from "../../UI/Icons/LogoutIcon.jsx";
import { useDispatch } from "react-redux";
import { setHoveredNav } from "../../store/UI-slice.js";

export default function Settings({
  onSettingOpen,
  onSettingClose,
  onLogoutClick,
}) {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.settingsWrapper}
      onMouseEnter={() => dispatch(setHoveredNav({ hoveredNav: "setting" }))}
      onMouseLeave={() => dispatch(setHoveredNav({ hoveredNav: "" }))}
    >
      <button className={styles.closeButton} onClick={onSettingClose}>
        ✕
      </button>

      <div className={styles.settingsContent}>
        <SettingIcon />
        <span className={styles.settingsText}>Settings</span>
      </div>

      <button className={styles.logoutButton} onClick={onLogoutClick}>
        <LogoutIcon />
        <span className={styles.logoutText}>Logout</span>
      </button>
    </div>
  );
}

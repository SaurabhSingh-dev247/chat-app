import styles from "./DashboardNav.module.css";
import AppLogo from "../../../UI/AppLogo";
import icon from "../../../assets/icon.png";
import NavButton from "../../../UI/Icons/NavButton";
import MessageIcon from "../../../UI/Icons/MessageIcon";
import ActivityIcon from "../../../UI/Icons/ActivityIcon";
import CallIcon from "../../../UI/Icons/CallIcon";
import SettingIcon from "../../../UI/Icons/SettingIcon";
import Settings from "../../settings/Settings";
import Modal from "../../../UI/dialog/Modal.jsx";
import Logout from "../../logout/Logout.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  closeSetting,
  setActiveNav,
  setHoveredNav,
  openLogoutTab,
  closeLogoutTab,
} from "../../../store/UI-slice.js";

export default function DashBoardNav() {
  const dispatch = useDispatch();
  const activeButton = useSelector((state) => state.ui.activeNav);
  const isHovered = useSelector((state) => state.ui.hoveredNav);
  const logoutOpen = useSelector((state) => state.ui.logoutTabOpen);

  return (
    <>
      <Modal open={logoutOpen} onClose={() => dispatch(closeLogoutTab())}>
        {logoutOpen && (
          <Logout onLogoutClose={() => dispatch(closeLogoutTab())} />
        )}
      </Modal>
      <nav className={styles["chat-nav"]}>
        <div className={styles["logo-container"]}>
          <AppLogo imgSource={icon} parentClass={styles["icon-parent"]} />
        </div>
        <div className={styles["icons-container"]}>
          <NavButton
            onClick={() => dispatch(setActiveNav({ activeNav: "message" }))}
            onMouseEnter={() =>
              dispatch(setHoveredNav({ hoveredNav: "message" }))
            }
            onMouseLeave={() => dispatch(setHoveredNav({ hoveredNav: "" }))}
            active={activeButton === "message"}
          >
            <MessageIcon
              active={activeButton === "message"}
              hovered={isHovered === "message"}
            />
          </NavButton>
          <NavButton
            onClick={() => dispatch(setActiveNav({ activeNav: "activity" }))}
            onMouseEnter={() =>
              dispatch(setHoveredNav({ hoveredNav: "activity" }))
            }
            onMouseLeave={() => dispatch(setHoveredNav({ hoveredNav: "" }))}
            active={activeButton === "activity"}
          >
            <ActivityIcon
              active={activeButton === "activity"}
              hovered={isHovered === "activity"}
            />
          </NavButton>
          <NavButton
            onClick={() => dispatch(setActiveNav({ activeNav: "call" }))}
            onMouseEnter={() => dispatch(setHoveredNav({ hoveredNav: "call" }))}
            onMouseLeave={() => dispatch(setHoveredNav({ hoveredNav: "" }))}
            active={activeButton === "call"}
          >
            <CallIcon
              active={activeButton === "call"}
              hovered={isHovered === "call"}
            />
          </NavButton>
          <NavButton
            onClick={() => {
              dispatch(setActiveNav({ activeNav: "setting" }));
            }}
            onMouseEnter={() =>
              dispatch(setHoveredNav({ hoveredNav: "setting" }))
            }
            onMouseLeave={() => dispatch(setHoveredNav({ hoveredNav: "" }))}
            active={activeButton === "setting" || isHovered === "setting"}
          >
            <SettingIcon
              active={activeButton === "setting"}
              hovered={isHovered === "setting"}
            />
          </NavButton>
        </div>
        {(activeButton === "setting" || isHovered === "setting") && (
          <Settings
            onSettingClose={() => {
              dispatch(setActiveNav({ activeNav: "message" }));
              dispatch(setHoveredNav({ hoveredNav: "" }));
            }}
            onLogoutClick={() => dispatch(openLogoutTab())}
          />
        )}
      </nav>
    </>
  );
}

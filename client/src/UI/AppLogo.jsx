import styles from "../components/dashboard/DashBoard.module.css";
import classes from "../components/dashboard/dashboard-nav/DashboardNav.module.css";

export default function AppLogo({ imgSource, parentClass }) {
  return (
    <div className={parentClass}>
      <img src={imgSource} className={classes["app-icon"]} />
    </div>
  );
}

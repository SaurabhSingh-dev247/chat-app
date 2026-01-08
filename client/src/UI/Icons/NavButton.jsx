import styles from "../../components/dashboard/DashBoard.module.css";

export default function NavButton({ children, active, ...props }) {
  const btnStyle = `${styles["nav-btn"]} ${active ? styles["active-nav"] : ""}`;

  return (
    <button className={btnStyle} {...props}>
      {children}
    </button>
  );
}

export default function ActivityIcon({
  active,
  hovered
}) {
  let activeStyles;

  if (active || hovered) {
    activeStyles = { color: "white" };
  } else {
    activeStyles = { opacity: "0.7" };
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...activeStyles,
      }}
     
    >
      <polyline
        points="3 12 7 12 10 6 14 18 17 12 21 12"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

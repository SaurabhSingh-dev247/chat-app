export default function CallIcon({
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
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2
           19.79 19.79 0 0 1-8.63-3.07
           19.5 19.5 0 0 1-6-6
           19.79 19.79 0 0 1-3.07-8.67
           A2 2 0 0 1 4.11 2h3
           a2 2 0 0 1 2 1.72
           c.12.9.32 1.76.59 2.59
           a2 2 0 0 1-.45 2.11L8.09 9.91
           a16 16 0 0 0 6 6l1.49-1.49
           a2 2 0 0 1 2.11-.45
           c.83.27 1.69.47 2.59.59
           A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

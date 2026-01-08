export default function SettingIcon({ active, hovered }) {
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
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06
           a2 2 0 0 1-2.83 2.83l-.06-.06
           a1.65 1.65 0 0 0-1.82-.33
           a1.65 1.65 0 0 0-1 1.51V21
           a2 2 0 0 1-4 0v-.09
           a1.65 1.65 0 0 0-1-1.51
           a1.65 1.65 0 0 0-1.82.33l-.06.06
           a2 2 0 0 1-2.83-2.83l.06-.06
           a1.65 1.65 0 0 0 .33-1.82
           a1.65 1.65 0 0 0-1.51-1H3
           a2 2 0 0 1 0-4h.09
           a1.65 1.65 0 0 0 1.51-1
           a1.65 1.65 0 0 0-.33-1.82l-.06-.06
           a2 2 0 0 1 2.83-2.83l.06.06
           a1.65 1.65 0 0 0 1.82.33
           h.09a1.65 1.65 0 0 0 1-1.51V3
           a2 2 0 0 1 4 0v.09
           a1.65 1.65 0 0 0 1 1.51
           a1.65 1.65 0 0 0 1.82-.33l.06-.06
           a2 2 0 0 1 2.83 2.83l-.06.06
           a1.65 1.65 0 0 0-.33 1.82v.09
           a1.65 1.65 0 0 0 1.51 1H21
           a2 2 0 0 1 0 4h-.09
           a1.65 1.65 0 0 0-1.51 1z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

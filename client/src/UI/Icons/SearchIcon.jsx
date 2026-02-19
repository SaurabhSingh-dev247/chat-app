const SearchIcon = ({ active, hovered }) => {
  const color = "currentColor";

  let activeStyles;

  if (active || hovered) {
    activeStyles = { color: "white" };
  } else {
    activeStyles = { opacity: "0.7" };
  }
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...activeStyles,
      }}
    >
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <line
        x1="16.65"
        y1="16.65"
        x2="21"
        y2="21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchIcon;

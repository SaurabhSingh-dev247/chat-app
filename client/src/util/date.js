export default function getDate(rawDate) {
  if (!rawDate) {
    return;
  }
  const today = new Date(rawDate);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = today
    .toLocaleDateString("en-GB", options)
    .replace(/\//g, "-");
  return formattedDate;
}

export default function getCurrentTime(raw) {
  if(!raw){
    console.log("NO RAW TIME : ", raw);
    return;
  }
  const time = new Date(raw).toLocaleTimeString();
  const splitted = time.split(":");

  const period = splitted[2].split(" ")[1];

  return splitted[0] + ":" + splitted[1] + period;
}

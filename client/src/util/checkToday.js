export function isToday(someDate) {
  if(!someDate){
    console.log("INVALID date string")
    return;
  }
  const dateCopy = new Date(someDate.valueOf()); 
  const today = new Date();

  dateCopy.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return dateCopy.getTime() === today.getTime();
}
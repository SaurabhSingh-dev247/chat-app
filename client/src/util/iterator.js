export function stringIterator(string, blurlength) {
  let newString = "";
  for (let i = 0; i < string.length; i++) {
    if (i >= blurlength) {
      newString += string[i];
    } else {
      newString += "X";
    }
  }
  return newString;
}

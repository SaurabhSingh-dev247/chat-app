// A custom function to generate username for testing purpose for
// the application.

export default function generateUserName(name) {
  const trimmedName = name.trim().split(" ");
  const length = trimmedName.length;
  const firstName = trimmedName[0];
  const lastName = length > 1 ? trimmedName[length - 1] : "";
  const firstNameLength = firstName.length;
  const charArray = ["-", "_", "&", "*", "^", "%", "$", "#", "@"];
  const firstNameChar = [".", "_", "__", "~"];

  const charToPutBetweenFirstAndLastNameIdx = Math.floor(
    Math.random() * charArray.length,
  );
  const charToPutInFirstNameIdx = Math.floor(
    Math.random() * firstNameChar.length,
  );
  const charBetweenLastNameAndRandomIntIdx = Math.floor(Math.random() * 3) + 1;
  const positionOfChar = Math.floor(Math.random() * firstNameLength);

  const modifiedFirstName =
    firstName.slice(0, positionOfChar) +
    firstNameChar[charToPutInFirstNameIdx] +
    firstName.slice(positionOfChar);

  const charBetweenFirstNameAndLast =
    charArray[charToPutBetweenFirstAndLastNameIdx];

  const charBetweenLastNameAndRandomInt =
    firstNameChar[charBetweenLastNameAndRandomIntIdx];

  const randomInt = Math.ceil(Math.random() * 99999);

  return lastName
    ? modifiedFirstName.toLowerCase() +
        charBetweenFirstNameAndLast +
        lastName +
        charBetweenLastNameAndRandomInt +
        randomInt
    : modifiedFirstName.toLowerCase() +
        charBetweenFirstNameAndLast +
        charBetweenLastNameAndRandomInt +
        randomInt;
}

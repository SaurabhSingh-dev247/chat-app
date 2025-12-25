import { isValidPhoneNumber } from "libphonenumber-js";

export function validatePhoneNumber(dialCode, number) {
  const fullNumber = `${dialCode}${number}`;
  return isValidPhoneNumber(fullNumber);
}

export function isValidEmail(email) {
  if (!email) return false;

  const trimmed = email.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailRegex.test(trimmed);
}

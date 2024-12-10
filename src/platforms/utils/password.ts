/* eslint-disable radix */
import Boom from '@hapi/boom';

export const checkPasswordWithPolicy = (passwordPolicy: any, password: string) => {
  let regexUpper = `^(.*?[A-Z]){${parseInt(passwordPolicy?.password_ucase_char)},}`;
  let regexLower = `^(.*?[a-z]){${parseInt(passwordPolicy?.password_lcase_char)},}`;
  let regexNumeric = `^(.*?[0-9]){${parseInt(passwordPolicy?.password_numeric_char)},}`;
  let regexSpecialChar = `^(.*?[-!$%^&*()_+|~=\`{}\\[\\]:\\/;<>?,.@#]){${parseInt(passwordPolicy?.password_special_char)},}`;
  const UPPERCASE_REGEX = new RegExp(regexUpper);
  const NUMERIC_REGEX = new RegExp(regexNumeric);
  const SPECIAL_CHAR_REGEX = new RegExp(regexSpecialChar);
  const LOWERCASE_REGEX = new RegExp(regexLower);

  if (password?.length > passwordPolicy?.password_length_max) {
    throw Boom.badRequest(` Password must be less than ${passwordPolicy?.password_length_max} characters long.`);
  } else if (password?.length < passwordPolicy?.password_length_min) {
    throw Boom.badRequest(` Password must be greater than ${passwordPolicy?.password_length_min} characters long.`);
  } else if (password?.match(UPPERCASE_REGEX) === null) {
    throw Boom.badRequest(` Password must have at least ${passwordPolicy?.password_ucase_char} uppercase letters.`);
  } else if (password?.match(LOWERCASE_REGEX) === null) {
    throw Boom.badRequest(` Password must have at least ${passwordPolicy?.password_lcase_char} lowercase letters.`);
  } else if (password?.match(NUMERIC_REGEX) === null) {
    throw Boom.badRequest(` Password must have at least ${passwordPolicy?.password_numeric_char} numbers.`);
  } else if (password?.match(SPECIAL_CHAR_REGEX) === null) {
    throw Boom.badRequest(` Password must have at least ${passwordPolicy?.password_special_char} special character.`);
  } else return true;
};

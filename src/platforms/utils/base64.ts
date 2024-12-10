/**
 * Encodes a given text to base64.
 *
 * @param {String} text
 * @returns {String}
 */
export const encode = (text: string) => {
  return Buffer.from(text).toString('base64');
};

/**
 * Decodes a given string to utf8 string.
 *
 * @param {String} text
 * @returns {String}
 */
export const decode = (text: string) => {
  return Buffer.from(text, 'base64').toString('utf8');
};

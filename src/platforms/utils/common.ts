
export const isObject = (value: any) => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
};

/**
 * Safely parses a JSON string.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @param {any} [defaultValue=''] - The default value to return if parsing fails.
 * @returns {any} - The parsed JSON object, or the default value if parsing fails.
 */
export const jsonParse = (jsonString: string, defaultValue = '') => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return defaultValue;
  }
};

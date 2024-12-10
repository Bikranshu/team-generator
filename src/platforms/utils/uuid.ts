import { v4 as uuidv4 } from 'uuid';

/**
 * Generate uuid for row id
 *
 * @returns {String}
 */
export const uuid = (): string => {
  return uuidv4();
};

import fs from 'fs';
import path from 'path';
import pug from 'pug';

/**
 * Compile template to a function and render multiple times with different params
 *
 * @param {String} filename
 * @param {Object} params
 * @returns {*}
 */
export const render = (filename: string, params: any) => {
  let templateDir = path.resolve(__dirname, '../templates/');

  let templateFile = path.join(templateDir, `${filename}.pug`);
  let html = fs.readFileSync(templateFile, 'utf-8');
  let template = pug.compile(html);

  return template({ info: params });
};

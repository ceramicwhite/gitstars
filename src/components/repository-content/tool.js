import { GITHUB_COM } from '@/constants';

/**
 * Converts the resource address of a repository README href or src
 * @param {string} str - The original resource address
 * @param {object} param1 - An object containing urlPrefix
 * @returns {string} - The converted resource address
 */
export const toRepostoryReadmeHref = (str, { urlPrefix } = {}) => {
  if (str.startsWith('http')) return str;
  if (str.startsWith('./')) return `${urlPrefix}${str.slice(1)}`;
  return `${urlPrefix}${str}`;
};

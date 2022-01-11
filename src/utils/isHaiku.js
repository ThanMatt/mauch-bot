import syllable from 'syllable'

/**
 * @param {string} content
 */

export const isHaiku = (content) => {
  return syllable(content) === 17
}

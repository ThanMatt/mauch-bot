import syllable from 'syllable'

/**
 * @param {string} content
 */

export const detectSyllables = (content) => {
  return syllable(content) === 17
}

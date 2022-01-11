import syllable from 'syllable'

/**
 *
 * @param {string} content
 */

export const createHaiku = async (content) => {
  let syllables = 0
  const words = content.split(' ')
  const lines = []
  let currentWords = []

  const appendLine = (word) => {
    currentWords.push(`${word}_`)
    lines.push(currentWords.join(' '))
    currentWords = []
    syllables = 0
  }
  try {
    words.forEach((word) => {
      syllables += syllable(word)

      if (syllables === 5 || syllables === 7) {
        if (!lines[0] || (lines[0] && !lines[1] && syllables === 7) || (lines[1] && !lines[2] && syllables === 5)) {
          appendLine(word)
        } else {
          currentWords.push(word)
        }
      } else if ((!lines[0] && !lines[3] && syllables >= 5) || syllables >= 7) {
        throw false
      } else {
        currentWords.push(word)
      }
    })

    const haiku = lines.map((line) => {
      return `_${line}`
    })

    return haiku
  } catch {
    return false
  }
}

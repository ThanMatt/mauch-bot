module.exports = getName = (content) => {
  const pattern = content
    .match(/(im|i am|i'm).\w+/gi, '')[0]
    .trim()
    .split(' ')

  return pattern[pattern.length - 1]
}

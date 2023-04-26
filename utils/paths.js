const createPathRegExp = (rawRegExp) => {
  return new RegExp(rawRegExp === '*' ? '' : rawRegExp);
}

module.exports = { createPathRegExp }

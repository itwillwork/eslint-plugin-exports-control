const createIdentifierRegExp = (rawRegExp) => {
  return new RegExp(rawRegExp === '*' ? '' : rawRegExp);
}

module.exports = { createIdentifierRegExp }

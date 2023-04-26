const {createPathRegExp} = require("./paths");
const {createIdentifierRegExp} = require("./identifiers");

class Matcher {
  constructor(scopeConfig) {
    this.allowedIdentifierRegExps = scopeConfig.patterns.map(createIdentifierRegExp);
    this.description = scopeConfig.description;
  }

  checkIsAllowedIdentifier(identifier) {
    return this.allowedIdentifierRegExps.some(allowedIdentifierRegExp => {
      return allowedIdentifierRegExp.test(identifier);
    });
  }

  getErrorMessage(identifier) {
    return `Export "${identifier}" not allowed "${this.description}"`
  }
}

const createMatcher = (
  config,
  filename,
) => {
  if (!config) {
    return null;
  }

  const matchedScopeConfig = config.find((scopeConfig) => {
    if (!scopeConfig || !scopeConfig.paths) {
      return null;
    }

    const includePathRegExps = (scopeConfig.paths.includes || []).map(createPathRegExp);
    const excludePathRegExps = (scopeConfig.paths.excludes || []).map(createPathRegExp);

    return (
      includePathRegExps.some(pathRegExp => pathRegExp.test(filename)) &&
      !excludePathRegExps.some(pathRegExp => pathRegExp.test(filename))
    );
  });

  if (matchedScopeConfig) {
    return new Matcher(matchedScopeConfig);
  }

  return null;
}

module.exports = { createMatcher }

const verifyOptions = (options) => {
  if (!options) {
    return;
  }

  const config = options[0];
  if (!config) {
    return;
  }

  if (!Array.isArray(config)) {
    throw new Error('Wrong options: options should be object array');
  }

  config.forEach(scopeConfig => {
    if (!scopeConfig) {
      return;
    }

    if (!scopeConfig.paths) {
      throw new Error('Wrong options: "paths" is required');
    }

    if (scopeConfig.paths && scopeConfig.paths.includes && (
      !Array.isArray(scopeConfig.paths.includes) ||
      (scopeConfig.paths.includes).some(pattern => typeof pattern !== 'string')
    )) {
      throw new Error('Wrong options: "paths.includes" should be string array');
    }

    if (scopeConfig.paths && scopeConfig.paths.excludes && (
      !Array.isArray(scopeConfig.paths.excludes) ||
      (scopeConfig.paths.excludes).some(pattern => typeof pattern !== 'string')
    )) {
      throw new Error('Wrong options: "paths.excludes" should be string array');
    }

    if (scopeConfig.patterns && (
      !Array.isArray(scopeConfig.patterns) ||
      (scopeConfig.patterns).some(pattern => typeof pattern !== 'string')
    )) {
      throw new Error('Wrong options: "patterns" should be string array');
    }

    if (!scopeConfig.description) {
      throw new Error('Wrong options: "description" required');
    }
  })
}

module.exports = { verifyOptions }

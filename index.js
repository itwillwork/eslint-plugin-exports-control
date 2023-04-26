const {verifyOptions} = require("./utils/verify-options");
const {createMatcher} = require("./utils/matcher");

const getNodeIdentifier = (node) => {
  if (node.type === "Identifier") {
    return node.name;
  }

  return null;
}

module.exports = {
  rules: {
    "exports-control": {
      create: (context) => {
        const {options} = context;

        verifyOptions(options);

        const config = options[0];
        if (!config) {
          return {}
        }

        return {
          'ExportNamedDeclaration': (node) => {
            const filename = context.getFilename();

            const matcher = createMatcher(config, filename);
            if (!matcher) {
              return;
            }

            function checkExportedName(node) {
              const identifier = getNodeIdentifier(node);

              const isAllowedIdentifier = matcher.checkIsAllowedIdentifier(identifier);
              if (!isAllowedIdentifier) {
                context.report(node, matcher.getErrorMessage(identifier));
              }
            }

            if (node.declaration) {
              // for case: export class foo {};
              if (node.declaration.id) {
                checkExportedName(node.declaration.id);
                // for case: export const foo = () => {};
              } else if (node.declaration.declarations) {
                node.declaration.declarations.map(node => node.id).forEach(checkExportedName);
              }
            } else {
              // for case: export { foo };
              node.specifiers
                .map(node => node.exported)
                .forEach(checkExportedName);
            }
          },
        };
      },
    },
  },
};

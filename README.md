# eslint-plugin-exports-control

Eslint plugin for linting exports

## Installation

```
npm i --save-dev eslint-plugin-exports-control
```

## Usage

Create an .eslint.json file with the following:

```json
"plugins": [
    "exports-control"
]
```

Then, you can add the custom rules to the .eslint.json file:

```json
"rules": {
  "exports-control/exports-control": "error",
}
```

To lint your project with ESLint, add the following script to your package.json:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

and run the linter with:

```
npm run lint
```

## Rules

#### exports-control/exports-control

Config example:

```js
"exports-control/exports-control": ['error', [{
    paths: {
      includes: ['endpoints/*'],
      excludes: ['endpoints/models/*'],
    },
    patterns: ['EndpointT$'],
    description: 'There is only endpoints models, with names end of ...EndpointT',
  }]],
```

Examples of incorrect code for this rule:

```js
// in file "endpoints/user.ts"
export const CurrentUserT = ...
// or
export { CurrentUserT }
```

Examples of correct code for this rule:

```js
// in file "endpoints/user.ts"
export const CurrentUserEndpointT = ...
// or
export { CurrentUserEndpointT }

// in file  "endpoints/models/roles.ts"
export enum RolesEnum { ... }
// or
export { RolesEnum }
```

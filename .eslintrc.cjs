module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    "ignorePatterns": ["jest.config.js", "build/*"],
    plugins: [
        '@typescript-eslint',
    ],
    "rules": {
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
};
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  clearMocks: true,
  coverageDirectory: "coverage",
  collectCoverage: true,
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/src/$1',
    "^antd/es/(.*)$": "antd/lib/$1",
    "^antd-mobile/es/(.*)$": "antd-mobile/cjs/$1",
    // '\\.(css|less)$/': 'identity-obj-proxy',
    "\\.(css|less)$": "<rootDir>/tests/mocks/style-mock.js",
    "^lodash-es$": "lodash",
  },
};

/ @type {import('ts-jest').JestConfigWithTsJest} /
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ['js', 'ts', "node", "json"],
  roots: ["<rootDir>/src"],
  testMatch: ['/__test__//*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)']
};
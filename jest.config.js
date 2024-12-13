/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  forceExit: true,
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};
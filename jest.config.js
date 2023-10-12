/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testPathIgnorePatterns: ["/script/"],
  preset: "ts-jest",
  testEnvironment: "node",
};

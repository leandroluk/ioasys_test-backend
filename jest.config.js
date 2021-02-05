process.env.NODE_NO_WARNINGS = 1

module.exports = {
  preset: '@shelf/jest-mongodb',
  roots: [
    '<rootDir>/src'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.interface.ts',
    '!<rootDir>/src/**/constants.ts'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/mocks/'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

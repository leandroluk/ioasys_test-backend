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
    '<rootDir>/src/mocks/',
    '<rootDir>/src/main/config/',
    '<rootDir>/src/main/server.ts',
    '<rootDir>/src/main/routes/health-check.route.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

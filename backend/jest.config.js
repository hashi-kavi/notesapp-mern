module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/../frontend/',
    '<rootDir>/../selenium/',
    '<rootDir>/../.vscode/',
    '<rootDir>/../votechain-app/',
    '<rootDir>/../jmeter/',
    '<rootDir>/../AppData/',
    '<rootDir>/../Documents/',
    '<rootDir>/../flutter/',
    '<rootDir>/../.github/',
    '<rootDir>/../docs/'
  ],
  testTimeout: 10000,
  maxWorkers: 1 // Run tests sequentially to avoid database conflicts
};

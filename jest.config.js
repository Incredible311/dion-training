module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/src/components/$1',
      '^@/app/(.*)$': '<rootDir>/src/app/$1',
      '^@/store/(.*)$': '<rootDir>/src/store/$1',
      '^@/services/(.*)$': '<rootDir>/src/services/$1',
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
      },
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/.next/',
    ],
  };
  
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      // Handle module aliases
      '^@/(.*)$': '<rootDir>/src/$1',
      // Handle CSS imports (with CSS modules)
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
      // Handle CSS imports (without CSS modules)
      '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
      // Handle image imports
      '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', {
        tsconfig: 'tsconfig.jest.json'
      }]
    },
    coveragePathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/src/types/'
    ],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts'
    ]
  };
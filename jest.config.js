module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform:              {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFiles: [
    '<rootDir>/src/.jest/console.js',
  ],
  coverageDirectory:   'coverage',
  collectCoverage:     true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageReporters: [
    'text',
    'cobertura',
    'html',
    'lcov'
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory:     'coverage',
        outputName:          'test-results.xml',
        usePathForSuiteName: 'true'
      }
    ],
  ],
}

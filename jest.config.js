const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: `<rootDir>/${compilerOptions.baseUrl}/`,
});
module.exports = {
  collectCoverageFrom: ['**/*.js', '**/*.ts', '**/*.tsx', '!**/*.stories.tsx'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/.vscode/',
    '<rootDir>/build/',
    '<rootDir>/coverage/',
    '<rootDir>/typings/',
    '<rootDir>/__tests__/',
    '<rootDir>/src/generated/datocms/',
    '<rootDir>/src/aws-exports.js',
  ],
  coverageReporters: ['html', 'json', 'text', 'lcov', 'clover', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './jest-reports/test-report.html',
      },
    ],
    [
      './node_modules/jest-junit',
      {
        outputDirectory: 'jest-reports',
        outputName: 'jest-junit.xml',
      },
    ],
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: 'tsconfig.jest.json',
      isolatedModules: true,
    },
  },
  preset: 'ts-jest/presets/js-with-ts',
  rootDir: '.',
  roots: ['<rootDir>/src/'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testPathIgnorePatterns: [
    'node_modules/',
    'src/generated/datocms/schema.gql.tsx',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/*.spec.(ts|tsx)', '**/*.test.(ts|tsx)'],
  verbose: true,
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    ...paths,
    // Mocks out all these file formats when tests are run
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

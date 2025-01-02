import type {Config} from 'jest';

const config: Config = {
  verbose: true,
};

export default config;

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],  // Configure ts-jest here
  },
  extensionsToTreatAsEsm: ['.ts'],  // Treat TypeScript files as ES modules
};

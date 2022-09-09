import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', []],
    'scope-empty': [2, 'never'],
  }
};

module.exports = Configuration;

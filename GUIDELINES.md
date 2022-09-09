## 1. Commit Message Guidelines

Project follows [conventional-commits](https://www.conventionalcommits.org/) commit message syntax to ensure convention and generate changelogs

`<type>(<scope>): LIC-xxx <subject>`

### Types

- Code relevant changes
  - `feat` Commits, that adds a new feature
  - `fix` Commits, that fixes a bug
- `refactor` Commits, that rewrite/restructure your code, however does not change any behaviour
  - `perf` Commits are special `refactor` commits, that improves performance
- `style` Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
- `test` Commits, that add missing tests or correcting existing tests
- `docs` Commits, that affect documentation only
- `build` Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
- `ops` Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
- `chore` Miscellaneous commits e.g. modifying `.gitignore`

### Scopes

The `scope` provides additional contextual information or component name

- Allowed Scopes depends on the specific project or feature
- Don't use issue identifiers as scopes

### Subject

The `subject` contains a succinct description of the change.

- Add project jira id at the start of the message
- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end

## 2. Upading npm packages

Run the command

`yarn npm:update`

# What a starter
Static site starter with custom webpack config.

## How to install?
Clone the project (don't fork) using:
```
git clone --depth=1 git@github.com:bastienrobert/halo.git YOUR_PROJECT_NAME
```

Then, delete the `.git` and init a new:
```
cd YOUR_PROJECT_NAME
rm -rf .git
git init
```

Finally, don't forget to edit the package.json file, you should update:
- The **name**
- The **version**
- The **description**
- The **author**
- And maybe, the **license**

Everything is cool? Launch the development server using `npm start` or `yarn start`.

## Packages
[Check the doc](https://github.com/bastienrobert/halo/wiki/Add-packages)

## Todo
[Check Github projects](https://github.com/bastienrobert/halo/projects)

## Build
Build using `npm run build` or `yarn build`. The build files will be on `static/`. This dir is gitignored so don't worry!

## Contributing
Please, before creating a pull request about a bug or a feature, create an issue about it.

Follow this scheme:
1. [Fork it](https://github.com/bastienrobert/halo/fork)
2. Create your feature branch (`git checkout -b <github-issue-hash>my-new-feature`)
3. Commit your changes (see below)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

### Commit
Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```
<TYPE>: <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The header is mandatory and the scope of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

The footer should contain a [closing reference](https://help.github.com/articles/closing-issues-via-commit-messages/) to an issue if any.

#### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

#### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

#### Exemple
```
git commit
  -m "FIX: Webpack dev server browser open"
  -m ""
  -m "On launching webpack dev server, it check if there's already a tab with same URL."
  -m "If there's one, it opens chrome in first-ground with the targetted tab and it will reload it."
  -m "Else, it opens a new tab in the default browser of your computer."
  -m ""
  -m "Close #1"
```

### Revert
If the commit reverts a previous commit, it should begin with revert:, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Types
Must be one of the following (only uppercase):

- BUILD: Changes that affect the build system or external dependencies
- CI: Changes to our CI configuration files and scripts
- DOCS: Documentation only changes
- FEAT: A new feature
- FIX: A bug fix
- PERF: A code change that improves performance
- REFACTOR: A code change that neither fixes a bug nor adds a feature
- RELEASE: On package.json version update
- STYLE: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

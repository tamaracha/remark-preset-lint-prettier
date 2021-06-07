# remark-preset-prettier

[![npm](https://img.shields.io/npm/v/remark-preset-lint-prettier.svg)](https://www.npmjs.com/package/remark-preset-lint-prettier)
[![GitHub release](https://img.shields.io/github/release/tamaracha/remark-preset-lint-prettier)](https://github.com/JounQin/remark-preset-lint-prettier/releases)

[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This Remark plugin turns off all rules that are unnecessary or might conflict with [Prettier][].
It is heavily inspired by the [remark-preset-prettier][] plugin.
The list of disabled plugins has been borrowed from there, but they differ in their implementation.

## Disabled remark-lint plugins

1.  [blank-lines-1-0-2](https://www.npmjs.com/package/remark-lint-blank-lines-1-0-2)
2.  [blockquote-indentation](https://www.npmjs.com/package/remark-lint-blockquote-indentation)
3.  [books-links](https://www.npmjs.com/package/remark-lint-books-links)
4.  [checkbox-character-style](https://www.npmjs.com/package/remark-lint-checkbox-character-style)
5.  [code-block-style](https://www.npmjs.com/package/remark-lint-code-block-style)
6.  [definition-case](https://www.npmjs.com/package/remark-lint-definition-case)
7.  [definition-spacing](https://www.npmjs.com/package/remark-lint-definition-spacing)
8.  [emphasis-marker](https://www.npmjs.com/package/remark-lint-emphasis-marker)
9.  [fenced-code-marker](https://www.npmjs.com/package/remark-lint-fenced-code-marker)
10. [final-newline](https://www.npmjs.com/package/remark-lint-final-newline)
11. [hard-break-spaces](https://www.npmjs.com/package/remark-lint-hard-break-spaces)
12. [heading-style](https://www.npmjs.com/package/remark-lint-heading-style)
13. [heading-whitespace](https://www.npmjs.com/package/remark-lint-heading-whitespace)
14. [link-title-style](https://www.npmjs.com/package/remark-lint-link-title-style)
15. [list-item-bullet-indent](https://www.npmjs.com/package/remark-lint-list-item-bullet-indent)
16. [list-item-content-indent](https://www.npmjs.com/package/remark-lint-list-item-content-indent)
17. [list-item-indent](https://www.npmjs.com/package/remark-lint-list-item-indent)
18. [list-item-spacing](https://www.npmjs.com/package/remark-lint-list-item-spacing)
19. [maximum-line-length](https://www.npmjs.com/package/remark-lint-maximum-line-length)
20. [no-blockquote-without-marker](https://www.npmjs.com/package/remark-lint-no-blockquote-without-marker)
21. [no-consecutive-blank-lines](https://www.npmjs.com/package/remark-lint-no-consecutive-blank-lines)
22. [no-heading-content-indent](https://www.npmjs.com/package/remark-lint-no-heading-content-indent)
23. [no-inline-padding](https://www.npmjs.com/package/remark-lint-no-inline-padding)
24. [no-long-code](https://www.npmjs.com/package/remark-lint-no-long-code)
25. [no-table-indentation](https://www.npmjs.com/package/remark-lint-no-table-indentation)
26. [ordered-list-marker-style](https://www.npmjs.com/package/remark-lint-ordered-list-marker-style)
27. [ordered-list-marker-value](https://www.npmjs.com/package/remark-lint-ordered-list-marker-value)
28. [rule-style](https://www.npmjs.com/package/remark-lint-rule-style)
29. [spaces-around-number](https://www.npmjs.com/package/remark-lint-spaces-around-number)
30. [spaces-around-word](https://www.npmjs.com/package/remark-lint-spaces-around-word)
31. [strong-marker](https://www.npmjs.com/package/remark-lint-strong-marker)
32. [table-cell-padding](https://www.npmjs.com/package/remark-lint-table-cell-padding)
33. [table-pipe-alignment](https://www.npmjs.com/package/remark-lint-table-pipe-alignment)
34. [table-pipes](https://www.npmjs.com/package/remark-lint-table-pipes)
35. [unordered-list-marker-style](https://www.npmjs.com/package/remark-lint-unordered-list-marker-style)

## Install

```sh
npm i -D remark-preset-lint-prettier
```

## Usage

### Add preset to configuration

You can add the preset to the plugins array of a remark configuration.
If you're using [remark-cli][], this could be a _.remarkrc_ file.

```json
{
  "plugins": [
    "preset-lint-recommended",
    "preset-lint-consistent",
    "preset-lint-markdown-style-guide",
    "preset-lint-prettier"
  ]
}
```

### Pass as CLI argument

```sh
npx remark --use preset-lint-recommended --use preset-lint-consistent --use preset-lint-markdown-style-guide --use preset-lint-prettier .
```

### Programatic usage

```js
const report = require('vfile-reporter')
const remark = require('remark')
const recommended = require('remark-preset-lint-recommended')
const consistent = require('remark-preset-lint-consistent')
const styleGuide = require('remark-preset-lint-markdown-style-guide')
const prettier = require('remark-preset-lint-prettier')

const file = remark()
  .use(recommended)
  .use(consistent)
  .use(styleGuide)
  .use(prettier)
  .processSync('_Hello world_')

console.log(report(file))
```

## [remark-retext][] issue

[retext-sentence-spacing][] is a plugin of [retext][], and [remark-retext][] makes it possible to use [retext][] plugins together with [remark][], and [retext-sentence-spacing][] may conflict with [Prettier][].

However, [remark-retext][] can only be enabled once what means we can not simply disable rule [retext-sentence-spacing][] in this preset which is actually meaningless.

If you do have problems between [retext-sentence-spacing][] and [Prettier][], you have to override the whole configuration of [remark-retext][] like following:

```js
// .remarkrc.js
const wooorm = require('retext-preset-wooorm')

module.exports = {
  plugins: [
    'preset-wooorm', // other preset(s) or plugin(s)
    'preset-prettier',
    [
      'retext',
      unified()
        .use(wooorm) // retext preset(s)
        .use({
          plugins: [[require('retext-sentence-spacing'), false]],
        }),
    ],
  ],
}
```

## Implementation details

The disabled plugins are maintained in `peerDependencies` of package.json and set optional via `peerDependenciesMeta`.
The actual preset code reads them from there, tries to require them and disables them if successful.

[prettier]: https://prettier.io
[remark]: https://github.com/remarkjs/remark
[remark-cli]: https://github.com/remarkjs/remark/tree/master/packages/remark-cli
[remark-retext]: https://github.com/remarkjs/remark-retext
[remark-preset-prettier]: https://github.com/JounQin/remark-preset-prettier
[retext]: https://github.com/retextjs/retext
[retext-sentence-spacing]: https://github.com/retextjs/retext-sentence-spacing

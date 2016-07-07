# react-i18n

React i18n

`npm i r-i18n --save`

## Usage

```jsx
import React from 'react'

import {
  init, 
  debug, 
  tct, 
  t, 
} from 'r-i18n'
```

## Samples

#### `init`
Use [Jed](http://slexaxton.github.io/Jed) to initialize i18n in your project.

```jsx
init({ /* jed options */ })) 
```

#### `t`

Component as placeholder

```jsx
import {t} from 'r-i18n'

t('Welcome to Strikingly')  
// -> '欢迎使用 Strikingly'

t('Welcome to Strikingly. Click <a href="%{location}">here to continue</a>.', { location: 'http://www.strikingly.com/s/select_template' }) 
// -> '欢迎使用 Strikingly。<a href="http://www.strikingly.com/s/select_template">按此继续</a>。'

// React component as placeholder

t('%{author} assigned this event to %{assignee}', {
  author: <Author value={author} />,
  assignee: <em>example@example.com</em>
})
// -> [<Author value={author} />, ' assigned this event to ', <em>example@example.com</em>]
```

#### `tct`

HTML inside translated string with a root wrapper

```jsx
import {tct} from 'r-i18n'

//...

tct('Welcome. Click [link:here]', {
  root: <p/>,
  link: <a href="#" />
})
// -> <p>欢迎。点击 <a href="#">此处</a> 继续。</p>
```

### Debug & mark

Wrap `t` and `tct` with a wrapper `<span class="translation-wrapper"/>`

```jsx
import {tct, debug} from 'r-i18n'

//...

debug()

tct('Welcome. Click [link:here]', {
  root: <p/>,
  link: <a href="#" />
})
// -> <span class="translation-wrapper">
//      <p>欢迎。点击 <a href="#">此处</a> 继续。</p>
//    </span>
```

### React Native

React-i18n works both with React and React Native.  
For React Native, use `npm i rn-i18n --save`.

React Native branch: [react-native](https://github.com/strikingly/react-i18n/tree/react-native)

## Acknowledgement

#### [Sentry](https://github.com/getsentry/sentry)

Post about i18n and React on Sentry blog: [link](https://blog.getsentry.com/2016/01/07/react-i18n.html).

[Sentry source code on GitHub](https://github.com/getsentry/sentry/blob/f489a20c6d5318aba2f30fec0d745835436a94f7/src/sentry/static/sentry/app/locale.jsx).

[License of Sentry](./LICENSE-Sentry).

#### [sprintf.js](https://github.com/alexei/sprintf.js)

[License of sprintf.js](./LICENSE-sprintfjs)

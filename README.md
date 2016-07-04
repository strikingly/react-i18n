# react-i18n

## Usage

```jsx
import React from 'react'

import {
  setDebug, 
  init, 
  tct, 
  tn, 
  t, 
  __, 
} from 'r-i18n'
```

## Samples

#### `init`
Use [Jed](http://slexaxton.github.io/Jed) to initialize i18n in your project.

```jsx
init({ /* jed options */ })) 
```

#### `translate` (alias `__`)

```jsx
import {__} from 'r-i18n'

__('Welcome to Strikingly')  
// -> '欢迎使用 Strikingly'

__('Home|Welcome to Strikingly')  
// remove namespace
// -> '欢迎使用 Strikingly'

__('Welcome to Strikingly. Click <a href="%{location}">here to continue</a>.', { location: 'http://www.strikingly.com/s/select_template' }) 
// -> '欢迎使用 Strikingly。<a href="http://www.strikingly.com/s/select_template">按此继续</a>。'
```

### React

Note that you need to use sprintf style templates (`'%{value}s'`) instead of simple interpolate `'%{value}'`.

More info about sprintfjs: [link](https://github.com/alexei/sprintf.js).

#### `t`

Component as placeholder

```jsx
import {t} from 'r-i18n'

//...

t('%{author}s assigned this event to %{assignee}s', {
  author: <Author value={author} />,
  assignee: <em>example@example.com</em>
})
// React components
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
import {tct, setDebug} from 'r-i18n'

//...

setDebug()

tct('Welcome. Click [link:here]', {
  root: <p/>,
  link: <a href="#" />
})
// -> <span class="translation-wrapper">
//      <p>欢迎。点击 <a href="#">此处</a> 继续。</p>
//    </span>
```

## Acknowledgement

#### [Sentry](https://github.com/getsentry/sentry)

Post about i18n and React on Sentry blog: [link](https://blog.getsentry.com/2016/01/07/react-i18n.html).

[Sentry source code on GitHub](https://github.com/getsentry/sentry/blob/f489a20c6d5318aba2f30fec0d745835436a94f7/src/sentry/static/sentry/app/locale.jsx).

[License of Sentry](./LICENSE-Sentry).

#### [sprintf.js](https://github.com/alexei/sprintf.js)

[License of sprintf.js](./LICENSE-sprintfjs)

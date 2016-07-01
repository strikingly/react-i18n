# react-i18n

## Demo
```jsx
import {t, tct} from './src/i18n'

class App extends React.Component {
  render() {
    return <div>
      {
        tct('hello! click [link:here]', {
          root: <span/>,
          link: <a href="#"/>
        })
      }
      <hr/>
      {
        t('%{author}s assigned this event to %{assignee}s', {
          author: 'example',
          assignee: <b>example@example.com</b>
        })
      }
    </div>
  }
}
```

## locale (using `jed`)
```jsx
import Jed from 'jed'
import {setLocale} from './src/i18n'

setLocale(new Jed({ /* jed options */ }))
```

## debugging mode
```jsx
import Jed from 'jed'
import {setLocale} from './src/i18n'

setLocaleDebug(true)
// reload the page to apply
```

## License

- [Sentry license](./LICENSE-Sentry)
- [sprintf.js license](./LICENSE-sprintfjs)

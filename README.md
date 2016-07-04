# react-i18n

## Demo
```jsx
import {t, tct} from './index'

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
import {init} from './index'

init({ /* jed options */ }))
```

## License

- [Sentry license](./LICENSE-Sentry)
- [sprintf.js license](./LICENSE-sprintfjs)

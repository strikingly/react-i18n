import React from 'react'
import Jed from 'jed'
import ReactDOMServer from 'react-dom/server'
import assert from 'assert'

const { createI18n, debug } = require('../')

let i18n = createI18n()

describe('i18n', () => {
  it('should return i18n strings or react components', () => {
    assert(i18n.t('lorem ipsum') === 'lorem ipsum')
    // returns 'lorem ipsum'

    assert(i18n.t('%{li}', {li: <p>lorem ipsum</p>})[0].$$typeof === Symbol.for('react.element'))
    // returns [<p>lorem ipsum</p>]

    assert(i18n.t('lorem %{li} ipsum', {li: <p>lorem ipsum</p>}).length === 3)
    // returns ['lorem', <p>lorem ipsum</p>, 'ipsum']
  })

  it('should return templated strings', () => {
    assert(i18n.t('%{l}', {l: 'lorem'}) === 'lorem')
    assert(i18n.t('%{l} %{i}', {
        l: 'lorem',
        i: 'ipsum'
      }) === 'lorem ipsum')
    assert(i18n.t('%{author} assigned this event to %{assignee}', {
      author: <p>example</p>,
      assignee: <em>example@example.com</em>
    })[1] === ' assigned this event to ')
  })

  it('should return wrapped react components', () => {
    assert(ReactDOMServer.renderToStaticMarkup(i18n.tct('lorem [li] ipsum', {
        root: <div/>,
        li: <b>hey</b>
      })) === '<div><span>lorem </span><b>hey</b><span> ipsum</span></div>')
  })

  it('should translate words through jed', () => {
    i18n.init({
      'domain': 'i18n',
      'missing_key_callback': function (key) {
      },
      'locale_data': {
        'i18n': {
          '': {
            'domain': 'i18n',
            'lang': 'fr',
            'plural_forms': 'nplurals=2; plural=(n != 1);'
          },
          'hello': ['bonjour']
        }
      }
    })

    assert(i18n.t('hello') === 'bonjour')

    i18n.init({
      'domain': 'i18n',
      'missing_key_callback': function (key) {
      },
      'locale_data': {
        'i18n': {
          '': {
            'domain': 'i18n',
            'lang': 'fr',
            'plural_forms': 'nplurals=2; plural=(n != 1);'
          },
          'hello %{name}': ['bonjour %{name}']
        }
      }
    })

    assert(i18n.t('hello %{name}', {name: 'world'}) === 'bonjour world')

    i18n.init({noPo: true})

    assert(i18n.t('Beijin %{name}') === 'Beijin %{name}')
  })

  it('should return debugging wrapper', () => {
    debug()
    assert(ReactDOMServer.renderToStaticMarkup(i18n.tct('lorem [li] ipsum', {
        root: <div/>,
        li: <b>hey</b>
      })) === '<span class="translation-wrapper"><div><span>lorem </span><b>hey</b><span> ipsum</span></div></span>')
  })

  it('should return some emoji chars when debugging with tct & toString()', () => {
    assert(i18n.tct('hello', {
        root: <span/>
      }).toString() === '🇦🇹 [object Object] 🇦🇹')
  })

  it('should return an array with a flag emoji when debugging with __ & react args', () => {
    assert(ReactDOMServer.renderToStaticMarkup(
      <div>{i18n.t('lorem %{li} ipsum', {
        li: <b>hey</b>
      })}</div>
    ) === '<div>lorem <b>hey</b> ipsum 🇦🇹</div>')
  })

  it('should return a string with a flag emoji when debugging with __ & raw strings', () => {
    assert(i18n.t('lorem %{li} ipsum', {
      li: 'hey'
    }) === 'lorem hey ipsum 🇦🇹')
  })
})

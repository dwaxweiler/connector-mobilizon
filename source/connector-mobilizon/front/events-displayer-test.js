import test from 'ava'
import { JSDOM } from 'jsdom'

import { displayEvents, displayErrorMessage } from './events-displayer'

let document

test.before(() => {
  document = new JSDOM().window.document
})

test.beforeEach(t => {
  t.context.list = document.createElement('ul')
  t.context.list.setAttribute('data-locale', 'en-GB')
  t.context.list.setAttribute('data-maximum', '2')
  t.context.list.setAttribute('data-time-zone', 'utc')
  const listElement = document.createElement('li')
  listElement.setAttribute('style', 'display: none;')
  t.context.list.appendChild(listElement)
})

test('#displayEvents one event', t => {
  const list = t.context.list
  const data = {
    events: {
      elements: [
        {
          title: 'a',
          url: 'b',
          beginsOn: '2021-04-15T10:30:00Z',
          endsOn: '2021-04-15T15:30:00Z',
          physicalAddress: {
            description: 'c',
            locality: 'd'
          }
        }
      ]
    }
  }
  displayEvents({ data, document, list })
  t.is(list.children.length, 2)
  t.is(list.children[1].childNodes[0].tagName, 'A')
  t.is(list.children[1].childNodes[0].getAttribute('href'), 'b')
  t.is(list.children[1].childNodes[0].childNodes[0].nodeValue, 'a')
  t.is(list.children[1].childNodes[1].tagName, 'BR')
  t.is(list.children[1].childNodes[2].nodeValue, '15/04/2021 10:30 - 15:30')
  t.is(list.children[1].childNodes[3].tagName, 'BR')
  t.is(list.children[1].childNodes[4].nodeValue, 'c, d')
})

test('#displayErrorMessage no children added', t => {
  const list = t.context.list
  displayErrorMessage({ data: '', list })
  t.is(list.children.length, 1)
})

test('#displayErrorMessage error message display', t => {
  const list = t.context.list
  displayErrorMessage({ data: '', list })
  t.is(list.children[0].style.display, 'block')
})

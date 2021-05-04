import test from 'ava'
import Formatter from './formatter'

test('#formatDate one date', t => {
  const date = Formatter.formatDate({ locale: 'en-GB', start: '2021-04-15T10:30:00Z', end: '2021-04-15T15:30:00Z' })
  t.is(date, '15/04/2021 12:30 - 17:30')
})

test('#formatDate two dates', t => {
  const date = Formatter.formatDate({ locale: 'en-GB', start: '2021-04-15T10:30:00Z', end: '2021-04-16T15:30:00Z' })
  t.is(date, '15/04/2021 12:30 - 16/04/2021 17:30')
})

test('#formatLocation both parameters', t => {
  const date = Formatter.formatLocation({ description: 'a', locality: 'b' })
  t.is(date, 'a, b')
})

test('#formatLocation description only', t => {
  const date = Formatter.formatLocation({ description: 'a' })
  t.is(date, 'a')
})

test('#formatLocation locality only', t => {
  const date = Formatter.formatLocation({ locality: 'a' })
  t.is(date, 'a')
})

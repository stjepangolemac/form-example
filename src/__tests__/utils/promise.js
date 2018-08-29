import { isPromise } from 'util/promise'

describe('isPromise', () => {
  test('should return true for promise', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
  })

  test('should return false for non promise', () => {
    expect(isPromise({ foo: 'bar', baz: () => null })).toBe(false)
    expect(isPromise({ then: 123 })).toBe(false)
  })
})

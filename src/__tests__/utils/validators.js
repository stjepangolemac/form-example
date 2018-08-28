import { isEmpty } from 'util/validators'

test('isEmpty returns an error for empty string', () => {
  expect(isEmpty('')).toBeTruthy()
})

test('isEmpty does not return error for non empty string', () => {
  expect(isEmpty('random string')).toBeUndefined()
})
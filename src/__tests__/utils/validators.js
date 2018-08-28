import { isEmpty } from 'util/validators'

test('isEmpty returns an error for empty string', () => {
  expect(isEmpty('')).toBeTruthy()
})
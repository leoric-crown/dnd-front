export function setTesting(testing) {
  console.log('executing setTesting')
  return {
    type: 'SET_TESTING',
    payload: {
      testing: testing
    }
  }
}

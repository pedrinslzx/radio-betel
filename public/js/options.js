export const getOption = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key) || defaultValue
    return JSON.parse(value)
  } catch (err) {
    return false
  }
}
export const setOption = (key, value) => {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (er) {
    return false
  }
}

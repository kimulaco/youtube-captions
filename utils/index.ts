export const queryToString = (queryValue: any) => {
  return Array.isArray(queryValue) ? queryValue[0] : queryValue
}

export const wait = (time: number = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

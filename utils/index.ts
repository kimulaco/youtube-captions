export const queryToString = (queryValue: any) => {
  return Array.isArray(queryValue) ? queryValue[0] : queryValue
}

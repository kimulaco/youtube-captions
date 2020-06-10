import { wait } from './'

export const fetcher = async (
  url: string,
  params: {[key: string]: any} = {}
) => {
  const response = await fetch(url, params)
  const data = await response.json()
  return data
}

export const delayFetch = async (
  url: string,
  params: {[key: string]: any} = {}
) => {
  const [data] = await Promise.all([
    fetcher(url, params),
    wait(1000),
  ])
  return data
}

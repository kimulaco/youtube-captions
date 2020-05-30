import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Video } from '../interfaces/youtube'

const IndexPage = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  return (
    <Layout>
      <form onSubmit={(event: any) => {
        event.preventDefault()
        router.push(`/search?q=${keyword}`)
      }}>
        <input
          type="text"
          value={keyword}
          onChange={(event: any) => {
            setKeyword(event.target.value)
          }}
        />
      </form>
    </Layout>
  )
}

export default IndexPage

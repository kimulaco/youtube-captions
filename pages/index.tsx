import { useRouter } from 'next/router'
import Layout from '../components/Layout/'
import SearchForm from '../components/SearchForm/'

const IndexPage = () => {
  const router = useRouter()

  return (
    <Layout path="/">
      <SearchForm
        id="q"
        value=""
        placeholder="カンファレンス..."
        onSubmit={(value: string) => {
          router.push(`/search?q=${value}`)
        }}
      />
    </Layout>
  )
}

export default IndexPage

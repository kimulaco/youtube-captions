import { useRouter } from 'next/router'
import Layout from '../../components/Layout/'
import styles from './index.module.scss'

const IndexPage = () => {
  const router = useRouter()

  const EroorMessage = () => {
    if (router.query.type === 'forbidden') {
      return <p className={styles.desc}>
        現在、サービスをご利用いただくことができません。
      </p>
    }
    return <p className={styles.desc}>
      エラーが発生しました。
    </p>
  }

  return (
    <Layout path="/error">
      <h1 className={styles.title}>Error</h1>
      <EroorMessage />
    </Layout>
  )
}

export default IndexPage

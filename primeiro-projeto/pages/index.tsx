import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>teste</h1>
      <ul>
        <li><Link href="/sobre">Sobre</Link></li>
        <li><Link href="/blog">Blog</Link></li>
      </ul>
    </>
  )
}

import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import LogoVercel from '../public/vercel.svg'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>next muito louco</title>
        <meta name="title" content="next muito louco" />
        <meta name="description" content="site feito em estudos de next da b7web" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://localhost:3000/" />
        <meta property="og:title" content="next muito louco" />
        <meta property="og:description" content="site feito em estudos de next da b7web" />
        <meta property="og:image" content="https://localhost:3000/vercel.svg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://localhost:3000/" />
        <meta property="twitter:title" content="next muito louco" />
        <meta property="twitter:description" content="site feito em estudos de next da b7web" />
        <meta property="twitter:image" content="https://localhost:3000/vercel.svg" />

      </Head>
      <h1>Home</h1>

      <Image
        src={LogoVercel}
        alt="logo vercel"
      />

      <Image
        src="https://www.google.com.br/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png"
        alt="logo google"
        width={100}
        height={50}
      />
    </>
  )
}

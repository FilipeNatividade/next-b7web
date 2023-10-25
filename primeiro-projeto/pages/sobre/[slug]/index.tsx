import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
    varPrivada: string
}

export const SobreItem = ({ varPrivada }: Props) => {
    const router = useRouter()
    const { slug } = router.query

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            console.log(`indo para ${url}`)
        }


        router.events.on('routeChangeComplete',handleRouteChange,)

        return () => {
            router.events.off('routeChangeComplete',handleRouteChange,)
        }
    }, [])

    return (
        <div>
            <h1>{`Página dinâmica => [slug]:`} {slug}</h1>

            <p>Variável de ambiente: {process.env.PUBLIC}</p>

            <p>Variável de ambiente: {varPrivada}</p>

            <Link href={`${slug}/idade`}>Idade</Link>


            <div>
                <h2>Estudos do router</h2>
                <p>Parametro: {slug}</p>
                <p>Pathname: {router.pathname}</p>
                <p>isFallback: {router.isFallback?.toString()}</p>

                <button onClick={() => {
                    // router.push('/sobre/pedro')
                    // router.replace('/sobre/pedro')
                    // maneira dinamica
                    router.push({
                        pathname: `/sobre/[slug]`,
                        query: { slug: 'pedro' }
                    })
                }}>
                    Ir para página Pedro
                </button>
            </div>

        </div>
    )
}


// export const getStaticProps = () => {
//     return {
//         props: {
//             varPrivada: process.env.PRIVADA
//         }
//     }
// }

export default SobreItem
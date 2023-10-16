import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const SobreItem = () => {
    const { query } = useRouter()

    return (
        <div>
            <h1>{`Página dinâmica => [slug]:`} {query.slug}</h1>
            <Link href={`${query.slug}/idade`}>Idade</Link>

        </div>
    )
}

export default SobreItem